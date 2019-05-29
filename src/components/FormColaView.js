import React, { Component } from 'react';
import {
    AppRegistry,
    Platform, Image,
    TextInput,
    Button,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Picker,
    ScrollView
} from 'react-native';

import axios from 'axios';


class FormColaView extends React.Component {

    constructor() {
        super();
        this.state = {
             origen: '',
             destino: '',
             tarifa: '',
             banco: '',
             hora: '',
             cantPasajeros: ''
         }
    }

     updateValue(text, i) {
        switch(i){
            case 1:
                this.setState({
                    origen: text
                })
                break;
            case 2:
                this.setState({
                destino: text
                })
                break;
            case 3:
                this.setState({
                  tarifa: text
                })
                break;
            case 4:
                this.setState({
                  banco: text
                })
                break;
            case 5:
                this.setState({
                  hora: text
                })
                break;
            case 6:
                this.setState({
                  cantPasajeros: text
                })
                break;
        }
     }
 
    /* async submit(params) {
         try {
             switch (params) {
                 case 1:
                   //  var urlP = 'http://10.0.2.2:8080/iniciarPasajero';
 
                     let pasajero = await axios.post(urlP, {
                         email: this.state.email
                     })
 
                     //console.warn(pasajero)
 
                     if (pasajero.data.success) {
                         this.setState({
                             email: ''
                         })
 
                         //console.warn(pasajero.data.pasajero.id)
 
                         this.props.navigation.navigate('Pasajero', {
                            // PasajeroId: pasajero.data.pasajero.id,
                            // PasajeroEmail: pasajero.data.pasajero.email
                         });
                     }
                     break;
                 case 2:
                     var urlC = 'http://10.0.2.2:8080/iniciarConductor';
 
                   //  let conductor = await axios.post(urlC, {
                         email: this.state.email
                     //})
 
                     //console.warn(conductor)
 
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
 
         } catch (error) {
             this.props.navigation.push('Registry');
         }
     }
*/
    static navigationOptions = {
        header: null
    }

    render() {
        return (

              <View style={styles.container}>
  
                 <TextInput
                      placeholder="Orígen"
                      style={styles.textInput}
                      editable={true}
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => this.updateValue(text, 1)}
                      value={this.state.origen}
            
                  />
                  <TextInput
                      placeholder="Destino"
                      style={styles.textInput}
                      editable={true}
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => this.updateValue(text, 2)}
                      value={this.state.destino}
             
                  />
                  <TextInput
                      placeholder="Tarifa"
                      style={styles.textInput}
                      editable={true}
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => this.updateValue(text, 3)}
                      value={this.state.tarifa}
                      keyboardType="numeric"
                  />
                  <TextInput
                      placeholder="Banco"
                      style={styles.textInput}
                      editable={true}
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => this.updateValue(text, 4)}
                      value={this.state.banco}
                  />
                  <TextInput
                      placeholder="Hora"
                      style={styles.textInput}
                      editable={true}
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => this.updateValue(text, 5)}
                      keyboardType="numeric"
                  />
                  <TextInput
                      placeholder="Cantidad de Pasajeros"
                      style={styles.textInput}
                      editable={true}
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => this.updateValue(text, 6)}
                      value={this.state.cantPasajeros}
                      keyboardType="numeric"
                  />
                  <Picker
                      selectedValue={this.state.vehiculo}
                      style={styles.Picker}
                      onValueChange={(itemValue, itemIndex) =>
                          this.setState({ vehiculo: itemValue })
                      }>
                      <Picker.Item label="Moto" value="moto" />
                      <Picker.Item label="Carro" value="carro" />
                  </Picker>
                 
  
              </View>
       
                
          
        );
    }
}

export default FormColaView;

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
       // borderRadius: 25,
        width: 300
    },
    textInput: {
        alignSelf: 'center',
        paddingHorizontal: 16,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
       // borderRadius: 25,
        width: 300
    },
    Picker:{
        alignSelf: 'center',
        paddingHorizontal: 16,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
        borderWidth: 1,
        overflow: 'hidden',
       // borderRadius: 10,
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
