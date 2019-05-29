import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import ListadoColas from './ListadoColas';
import BotonColasSolicitadas from './BotonColasSolicitadas';
import { Container } from 'native-base';

class ConductorView extends React.Component {

  static navigationOptions = {
    header: null,
  }

  render() {

    const ConductorId = this.props.navigation.getParam('ConductorId', 'No-Id');
    const ConductorEmail = this.props.navigation.getParam('ConductorEmail', 'No-Email');

    return (
      <Container style={{ backgroundColor: 'rgb(20,20,20)' }}>
        <View>
          <BotonColasSolicitadas />
        </View>
        <Image
          source={{ uri: 'https://png.pngtree.com/svg/20170502/91a8305b9c.png' }}
          style={styles.container}
        />
        <ListadoColas {...this.props}/>
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
    backgroundColor: '#82826C',
    padding: 10,
    marginTop: 30
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