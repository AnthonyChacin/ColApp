/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {AppRegistry, Platform, StyleSheet, Text, View} from 'react-native';
import {createStackNavigator, createAppContainer, DrawerNavigator, createDrawerNavigator} from 'react-navigation';

import RegistryView from './src/components/RegistryView';
import PasajeroView from './src/components/PasajeroView';
import ConductorView from './src/components/ConductorView';

import PushNotificationIOS from 'react-native';
import PubNubReact from 'pubnub-react';
const PushNotification = require('react-native-push-notification');


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.pubnub = new PubNubReact({
        publishKey: 'pub-c-d7d3663d-7ef8-4800-96e5-68eb8f5b4041',
        subscribeKey: 'sub-c-336faa76-86ed-11e9-9f15-ba4fa582ffed'
    });
    this.pubnub.init(this);
    PushNotification.configure({
      // Called when Token is generated.
      onRegister: function(token) {
          console.log( 'TOKEN:', token );
          /* if (token.os == "ios") {
            this.pubnub.push.addChannels(
            {
              channels: ['notifications'],
              device: token.token,
              pushGateway: 'apns'
            });
            // Send iOS Notification from debug console: {"pn_apns":{"aps":{"alert":"Hello World."}}}
          } else */ 
          if (token.os == "android"){
            this.pubnub.push.addChannels(
            {
              channels: ['notifications'],
              device: token.token,
              pushGateway: 'gcm' // apns, gcm, mpns
            });
            // Send Android Notification from debug console: {"pn_gcm":{"data":{"message":"Hello World."}}}
          }  
      }.bind(this),
      // Something not working?
      // See: https://support.pubnub.com/support/solutions/articles/14000043605-how-can-i-troubleshoot-my-push-notification-issues-
      // Called when a remote or local notification is opened or received.
      onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
        // Do something with the notification.
        // Required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        // notification.finish(PushNotificationIOS.FetchResult.NoData);
      },
      // ANDROID: GCM or FCM Sender ID
      senderID: "192268102442",
    });
  }

  render() {
    return (
      <AppContainer />
    )
  }
}

const AppDrawerNavigator = createDrawerNavigator({

//En la izquierda se muestra el nombre por el que llamaremos al componente cuando queramos ir a esa vista
//Y en la derecha está el nombre verdadero del componente (Nombre de la clase como tal) 

  Registry: RegistryView,
  Pasajero: PasajeroView,
  Conductor: ConductorView

},{
  
  //Aquí determinas qué vista será la primera en mostrarse. Por defecto puse el login
  // Fijense que uso el nombre que le definí arriba, cada vez que uses esos nombres, ponlos en comillas simples
  initialRouteName: 'Registry',
  drawerPosition: 'right',
  drawerWidth: 120

})

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