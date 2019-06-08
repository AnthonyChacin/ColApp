import React, { Component } from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text } from 'react-native';
import ListadoColas from './ListadoColas';
import BotonColasSolicitadas from './BotonColasSolicitadas';
import { Container, Icon } from 'native-base';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
//import MenuConductor from '../components/MenuConductor';

const { width, height } = Dimensions.get('window')
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.0005
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO


class ConductorView extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0
      },
      initialMarker: {
        latitude: 0,
        longitude: 0
      }
    }
  }

  async componentDidMount() {
    await Geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }

      var marker = {
        latitude: lat,
        longitude: long
      }

      this.setState({ loaded: true, initialPosition: initialRegion, initialMarker: marker })

    }, (error) => alert(JSON.stringify(error)),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 0 })

  }

  static navigationOptions = {
    header: null,
    drawerLabel: 'Conductor',
    drawerIcon: ({ tintColor }) => (
      <Icon name="car" />
    )
  }

  render() {

    return (
      <Container style={{ backgroundColor: 'rgb(20,20,20)' }}>

        <BotonColasSolicitadas />
        {/*  <Image
          source={{ uri: 'https://png.pngtree.com/svg/20170502/91a8305b9c.png' }}
          style={styles.img}
        /> */}

        {this.state.loaded && (<View style={styles.container}>
          <MapView style={styles.map}
            region={this.state.initialPosition}>
            <MapView.Marker
              coordinate={this.state.initialMarker}>
            </MapView.Marker>
          </MapView>
        </View>)}

        {/* this.state.loaded && (<View><Text style={{color: 'white'}}>{JSON.stringify(this.state.initialPosition)}</Text></View>) */}
        <ListadoColas {...this.props} />

      </Container>
    );
  }
}

export default ConductorView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    /* backgroundColor: '#82826C' */
  },
  map: {
    left: 0,
    right: 0,
    ...StyleSheet.absoluteFillObject,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#82826C',
    marginBottom: 10,
    marginLeft: '2%',
    width: '96%',
    shadowColor: '#E6880F',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowOffset: {
      width: 3,
      height: 3
    }
  },
  cardText: {
    color: 'black',
    padding: 10,
    fontSize: 15
  },
  button: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#82826C",
    alignItems: "center",
    color: "white",
    alignSelf: "center",
    margin: 0,
    borderRadius: 0,
    width: 300
  }
})