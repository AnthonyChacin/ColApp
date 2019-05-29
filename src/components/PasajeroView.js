import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import HeaderPasajero from './HeaderPasajero';
import { Container } from 'native-base';
import FormColaView from './FormColaView';

class PasajeroView extends React.Component {

  static navigationOptions = {
    header: null
  }

  render() {

    const PasajeroId = this.props.navigation.getParam('PasajeroId', 'No-Id');
    const PasajeroEmail = this.props.navigation.getParam('PasajeroEmail', 'No-Email');

    return (
      <Container style={{ backgroundColor: 'rgb(20,20,20)' }}>
        <ScrollView>
          <HeaderPasajero />
          <FormColaView />
        </ScrollView>
      </Container>
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