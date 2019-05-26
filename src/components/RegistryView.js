import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,Image, 
  TextInput, 
  Button, 
  StyleSheet, 
  Text, 
  View,
  TouchableOpacity
} from 'react-native';

import axios from 'axios';


class RegistryView extends React.Component {

  constructor(){
    super();
    this.state = {
      email: ''
    }
  }

  updateValue(text){
    this.setState({
      email: text
    })
  }

  async submit(params){
    try{
      switch(params){
        case 1:
          var urlP = 'http://10.0.2.2:8080/iniciarPasajero';

          let pasajero = await axios.post(urlP, {
            email: this.state.email
          })

          if(pasajero.data.success){
            this.setState({
              email: ''
            })
            this.props.navigation.push('Pasajero');
          }
          break;
        case 2:
          var urlC = 'http://10.0.2.2:8080/iniciarConductor';

          let conductor = await axios.post(urlC, {
            email: this.state.email
          })

          if(conductor.data.success){
            this.setState({
              email: ''
            })
            this.props.navigation.push('Conductor');
          }
          break
      }
     
    }catch(error){
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
          source={{uri: 'https://cdn.pixabay.com/photo/2014/04/02/14/06/car-306182_960_720.png'}}
          style={{width: 120, height: 58}}
        />
        
        <TextInput
          placeholder = "Correo UNIMET aquí"
          style={styles.textInput}
          editable =  {true}
          underlineColorAndroid = "transparent"
          onChangeText={(text) => this.updateValue(text)}
          value={this.state.email}
        /> 
        
        <TouchableOpacity 
          style = {styles.button}
          onPress = {() => this.submit(2)}
        >
          <Text style = {{color: "white", fontSize: 20}}>Ingrese como conductor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style = {styles.button}
          onPress = {() => this.submit(1)}
        >
          <Text style = {{color: "white", fontSize: 20}}>Ingrese como pasajero</Text>
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
    padding: 20,
    backgroundColor: "#E6880F",
    alignItems: "center",
    color: "white",
    alignSelf: "stretch",
    marginTop: 10,
    marginBottom: 10,
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: "#fff"
  },
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 20,
    color: '#E6880F',
    fontFamily: 'Arial'
  }
});
