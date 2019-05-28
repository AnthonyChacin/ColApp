import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import ListadoColas from './ListadoColas'

class ConductorView extends React.Component {

  static navigationOptions = {
    header: null,
    /*headerStyle: {
      backgroundColor: 'rgb(20,20,20)',
      height: 80
    },
    headerTintColor: "white",
    headerLeft: (
      <TouchableOpacity
        style={{ marginLeft: 10, backgroundColor: "#E6880F", padding: 20 }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Colas Solicitadas</Text>
      </TouchableOpacity>
    ),
    headerRight: (
      <TouchableOpacity
        style={{ marginRight: 10, backgroundColor: "#E6880F", padding: 20 }}
      >
        <Text style={{ color: "white", fontSize: 16 }}>Colas aceptadas</Text>
      </TouchableOpacity>
    )*/
  }

  render() {

    const ConductorId = this.props.navigation.getParam('ConductorId', 'No-Id');
    const ConductorEmail = this.props.navigation.getParam('ConductorEmail', 'No-Email');

    return (
      <ListadoColas />
      // <Text style={styles.text}>Sección para Aceptar Colas</Text>
      //<Text style={{ fontSize: 20, color: "black" }}> Hola conductor! </Text>
      //<Text style={{ fontSize: 20, color: "black" }}> Email: {ConductorEmail} </Text>
      //<Text style={{ fontSize: 20, color: "black" }}> Id: {ConductorId} </Text>
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

export default ConductorView;