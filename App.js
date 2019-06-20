/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Platform, Dimensions, StyleSheet, Text, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';
import { createStackNavigator, createAppContainer, DrawerNavigator, createDrawerNavigator } from 'react-navigation';

import RegistryView from './src/components/RegistryView';
import PasajeroView from './src/components/PasajeroView';
import ConductorView from './src/components/ConductorView';
import ColasAceptadasConductor from './src/components/ColasAceptadasConductor';
import AuthLoadingScreen from './src/components/AuthLoadingScreen';
//import Logout from './src/components/Logout';


import PubNubReact from 'pubnub-react';

const WIDTH = Dimensions.get('window').width;

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.pubnub = new PubNubReact({
      publishKey: 'pub-c-d7d3663d-7ef8-4800-96e5-68eb8f5b4041',
      subscribeKey: 'sub-c-336faa76-86ed-11e9-9f15-ba4fa582ffed'
    });

    this.pubnub.init(this);
  }

  render() {
    console.disableYellowBox = true;
    return(
      <AppContainer {...this.props} />
    )
  }
}

const AppDrawerNavigator = createDrawerNavigator({
  AuthLoadingScreen: {
    screen: AuthLoadingScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Registry: {
    screen: RegistryView,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  Pasajero: {
    screen: PasajeroView,
    navigationOptions: {
      drawerLabel: 'Pasajero',
      drawerIcon: () => (
        <Icon name="users" size={20} color="#E6880F" />
      )
    }
  },
  Conductor: {
    screen: ConductorView,
    navigationOptions: {
      drawerLabel: 'Conductor',
      drawerIcon: () => (
        <Icon name="car" size={20} color="#E6880F" />
      )
    }
  },
  ColasAceptadasConductor: {
    screen: ColasAceptadasConductor,
    navigationOptions: {
      drawerLabel: () => null
    }
  }/* ,
  Logout: {
    screen: Logout,
    navigationOptions: {
      drawerLabel: 'SignOut',
      drawerIcon: () => (
        <Icon name="sign-out-alt" size={20} color="red" />
      )
    }
  } */
},
  {
    initialRouteName: 'AuthLoadingScreen',
    drawerWidth: (WIDTH * 0.83),
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: '#E6880F',
      inactiveTintColor: '#aaaaaa',
      activeBackgroundColor: 'rgba(20,20,20,0.9)',
      inactiveBackgroundColor: '#ffffff',
    }
  }
)

const AppContainer = createAppContainer(AppDrawerNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(20,20,20)',
  }
});

/* export const Drawer = DrawerNavigator({
    Registry: {
      screen: RegistryView,
      navigationOptions: {
        drawer: {
          label: 'Registry'
        }
      }
    },
    Pasajero: {
      screen: PasajeroView,
      navigationOptions: {
        drawer: {
          label: 'Pasajero'
        }
      }
    },
    Conductor: {
      screen: ConductorView,
      navigationOptions: {
        drawer: {
          label: 'Conductor'
        }
      }
    }
}) */