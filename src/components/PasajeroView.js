import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base'

class PasajeroView extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {

    const PasajeroId = this.props.navigation.getParam('PasajeroId', 'No-Id');
    const PasajeroEmail = this.props.navigation.getParam('PasajeroEmail', 'No-Email');

    return (
      <View style={styles.container}>  
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