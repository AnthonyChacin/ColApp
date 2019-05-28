import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base'

class PasajeroView extends React.Component {
  
  static navigationOptions = {
    headerStyle: {
      backgroundColor: 'rgb(20,20,20)',
      height: 80
    },
    headerTintColor: "white",
    headerLeft: (
      <TouchableOpacity
        style = {{marginLeft: 30, backgroundColor: "#E6880F", padding: 20}}
      >
        <Text style = {{ color: "white", fontSize: 16}}>Pedir cola</Text>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        style = {{marginRight: 30, backgroundColor: "#E6880F", padding: 20}}
      >
        <Text style = {{ color: "white", fontSize: 16}}>Colas pedidas</Text>
      </TouchableOpacity>
    )
  }

  render() {

    const PasajeroId = this.props.navigation.getParam('PasajeroId', 'No-Id');
    const PasajeroEmail = this.props.navigation.getParam('PasajeroEmail', 'No-Email');
    console.warn(this.props.navigation.dispatch)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sección para Pedir Cola</Text>
        <Text style={{fontSize:20, color:"black"}}> Hola pasajero! </Text>
        <Text style={{fontSize:20, color:"black"}}> Email: {PasajeroEmail} </Text>
        <Text style={{fontSize:20, color:"black"}}> Id: {PasajeroId} </Text>   
        <TouchableOpacity
        style = {{marginLeft: 30, backgroundColor: "#E6880F", padding: 20}}
        onPress = {() => this.props.navigation.navigate('Cola')}
        >
          <Text style = {{ color: "white", fontSize: 16}}>Pedir cola</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(230,230,230)',
  },
  text: {
    color: 'orange',
    fontSize: 20
  }
});

export default PasajeroView;