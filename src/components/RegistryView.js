import React, {Component} from 'react';
import {
  AppRegistry,
  Platform,Image, 
  TextInput, 
  Button, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';


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

  async submit(){
    try{
      let data = {}
      data.email = this.state.email

      let response = fetch(`http://10.0.2.2:8080/iniciarPasajero`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${data.email}`
        })

      });
     
    }catch(error){
      console.error(error);
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
          style={{borderColor: '#E6880F', borderWidth: 2, height: 50, width: 200, color: '#E6880F'}}
          editable =  {true}
          placeholderTextColor = 'rgba(255,255,255,0.5)'
          onChangeText={(text) => this.updateValue(text)}
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
          onPress = {() => this.submit()}
          style = {styles.button}
          title="pasajero"
          color="#E6880F"
          accessibilityLabel="Learn more about this orange button"
        />
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
