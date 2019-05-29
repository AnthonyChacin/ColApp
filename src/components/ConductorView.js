import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import ListadoColas from './ListadoColas'

class ConductorView extends React.Component {

  static navigationOptions = {
    header: null,
  }

  render() {

    const ConductorId = this.props.navigation.getParam('ConductorId', 'No-Id');
    const ConductorEmail = this.props.navigation.getParam('ConductorEmail', 'No-Email');

    return (
      <ListadoColas />
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