/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform,Image, TextInput, Button, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.welcome}>Bienvenido a ColApp</Text>
        <Image
          source={{uri: 'https://cdn.pixabay.com/photo/2014/04/02/14/06/car-306182_960_720.png'}}
          style={{width: 120, height: 58}}
        />
        
        <TextInput
          placeholder = "Ingresa tu correo UNIMET aquí"
          style={{borderColor: '#E6880F', borderWidth: 2, height: 50, width: 200, color: '#E6880F'}}
          editable =  {true}
          placeholderTextColor = 'rgba(255,255,255,0.5)'
        /> 
        <Text style={styles.instructions}></Text>
        <Text style={styles.instructions}>Ingresa como:</Text>
        <Button 
          style = {styles.button}
          title="conductor"
          color="#E6880F"
          accessibilityLabel="Learn more about this orange button"
        />
        <Text style={styles.separador}></Text>
        <Button 
          style = {styles.button}
          title="pasajero"
          color="#E6880F"
          accessibilityLabel="Learn more about this orange button"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(20,20,20)',
  },
  button: {
    margin: 10,
  },
  
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    color: '#E6880F',
    fontFamily: 'Arial'
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 5,
  },
  instructions: {
    textAlign: 'center',
    color: 'white',
    marginBottom: 2,
  },
});
