import React, { Component } from 'react';
import { ppRegistry, StyleSheet, Dimensions, ScrollView } from 'react-native';
import HeaderConductor from './HeaderConductor';
import { Container, Icon } from 'native-base';

import { BackHandler } from "react-native";

const { width, height } = Dimensions.get('window')


class ConductorView extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Container style={{ backgroundColor: 'rgb(20,20,20)' }}>
        <HeaderConductor {...this.props}/>
      </Container>
    );
  }
}

export default ConductorView;

const styles = StyleSheet.create({

})