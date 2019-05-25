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

export default class App extends React.Component {

  render() {
    return (
      <AppContainer />
    )
  }
}

const AppStackNavigator = createStackNavigator({
  Registry: RegistryView,
  Pasajero: PasajeroView
},{
  //Aquí determinas qué vista será la primera en mostrarse
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
