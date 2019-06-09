import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import ListadoColas from './ListadoColas';
import BotonColasSolicitadas from './BotonColasSolicitadas';
import { Container, Icon } from 'native-base';

//import MenuConductor from '../components/MenuConductor';

const { width, height } = Dimensions.get('window')


class ConductorView extends React.Component {

  constructor(props) {
    super(props)
  }

  static navigationOptions = {
    header: null,
    drawerLabel: 'Conductor',
    drawerIcon: ({ tintColor }) => (
      <Icon name="car" />
    )
  }

  render() {

    return (
      <Container style={{ backgroundColor: 'rgb(20,20,20)' }}>

        <BotonColasSolicitadas />
        <ListadoColas {...this.props} />

      </Container>
    );
  }
}

export default ConductorView;

const styles = StyleSheet.create({

})