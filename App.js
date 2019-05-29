/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import RegistryView from './src/components/RegistryView';
import PasajeroView from './src/components/PasajeroView';
import ConductorView from './src/components/ConductorView';
import FormColaView from './src/components/FormColaView';

export default class App extends React.Component {

  render() {
    return (
      <AppContainer />
    )
  }
}

const AppStackNavigator = createStackNavigator({

//En la izquierda se muestra el nombre por el que llamaremos al componente cuando queramos ir a esa vista
//Y en la derecha está el nombre verdadero del componente (Nombre de la clase como tal) 

  Registry: RegistryView,
  Pasajero: PasajeroView,
  Conductor: ConductorView,
  Cola: FormColaView

},{
  
  //Aquí determinas qué vista será la primera en mostrarse. Por defecto puse el login
  // Fijense que uso el nombre que le definí arriba, cada vez que uses esos nombres, ponlos en comillas simples
  initialRouteName: 'Registry'
})

const AppContainer = createAppContainer(AppStackNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(20,20,20)',
  }
});