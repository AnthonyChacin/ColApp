import React, { Component } from 'react';
import {
  Image,
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import axios from 'axios';

class RegistryView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: ''
    }
  }

  updateValue(text) {
    this.setState({
      email: text
    })
  }

  async submit(params) {

    try {
      if (this.state.email != "") {
        switch (params) {
          case 1:

            var urlP = `https://colapp-asa.herokuapp.com/iniciarPasajero`;

            let pasajero = await axios.post(urlP, {
              email: this.state.email
            })

            if (pasajero.data.success) {
              
              this.setState({
                email: ''
              })

              this.props.navigation.navigate('Pasajero', {
                PasajeroId: pasajero.data.pasajero.id,
                PasajeroEmail: pasajero.data.pasajero.email
              });
            }
            break;
          case 2:
            var urlC = 'https://colapp-asa.herokuapp.com/iniciarConductor';

            let conductor = await axios.post(urlC, {
              email: this.state.email
            })

            if (conductor.data.success) {

              this.setState({
                email: ''
              })

              this.props.navigation.navigate('Conductor', {
                ConductorId: conductor.data.conductor.id,
                ConductorEmail: conductor.data.conductor.email
              });
            }
            break
        }
      }

    } catch (error) {
      this.props.navigation.push('Registry');
    }
  }

  static navigationOptions = {
    header: null
  }

  render() {
    return (

      <View style={styles.container}>

        <Text style={styles.welcome}>Bienvenido a ColApp</Text>

        <Image
          source={{ uri: 'https://cdn.pixabay.com/photo/2014/04/02/14/06/car-306182_960_720.png' }}
          style={{ width: 120, height: 58 }}
        />

        <TextInput
          placeholder="Correo UNIMET aquí"
          placeholderTextColor='rgba(20,20,20,0.3)'
          style={styles.textInput}
          editable={true}
          underlineColorAndroid="transparent"
          onChangeText={(text) => this.updateValue(text)}
          keyboardType="email-address"
          value={this.state.email}
          autoCapitalize="none"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submit(2)}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Ingrese como conductor</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => this.submit(1)}
        >
          <Text style={{ color: "white", fontSize: 20 }}>Ingrese como pasajero</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RegistryView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(20,20,20)',
  },
  button: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: "#E6880F",
    alignItems: "center",
    color: "white",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 25,
    width: 300
  },
  textInput: {
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 25,
    width: 300
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 20,
    color: '#E6880F',
    fontFamily: 'Arial'
  }
});
