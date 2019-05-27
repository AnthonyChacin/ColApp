import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

class PasajeroView extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Modo Pasajero</Text>   
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
  text: {
    color: 'orange',
    fontSize: 20
  }
});

export default PasajeroView;