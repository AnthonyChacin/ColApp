import React, { Component } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import HeaderPasajero from './HeaderPasajero';
import { Container } from 'native-base';

import { BackHandler } from "react-native";

class PasajeroView extends React.Component {

  static navigationOptions = {
    header: null
  }

  componentDidMount(){
    BackHandler.addEventListener('hardwareBackPress', () =>{
      const parent = this.props.navigation.dangerouslyGetParent();
      const isDrawerOpen = parent && parent.state && parent.state.isDrawerOpen;

      if(!isDrawerOpen){
        BackHandler.exitApp();
      }
      
    })
  }
  
  render() {
    return (
      <Container style={{ backgroundColor: 'rgb(20,20,20)' }}>
        <HeaderPasajero {...this.props} />
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