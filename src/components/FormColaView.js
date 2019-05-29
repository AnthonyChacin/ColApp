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
    Picker
} from 'react-native';

import DatePicker from 'react-native-datepicker';

import axios from 'axios';

class FormColaView extends React.Component {

    constructor() {
        super();
        this.state = {
            origen: '',
            destino: '',
            tarifa: '',
            banco: '',
            hora: new Date(),
            vehiculo: '',
            cantPasajeros: ''
        }
    }

    updateValue(param, i) {
        switch (i) {
            case 1:
                this.setState({
                    origen: param
                })
                break;
            case 2:
                this.setState({
                    destino: param
                })
                break;
            case 3:
                this.setState({
                    tarifa: param
                })
                break;
            case 4:
                this.setState({
                    banco: param
                })
                break;
            case 5:
                this.setState({
                    hora: param
                })
                break;
            case 6:
                this.setState({
                    cantPasajeros: param
                })
                break;
        }
     }
 
    async submit() {
         try {

          var url = 'https://colapp-is.herokuapp.com/pasajero/pedirCola';
 
          let cola = await axios.post(url, {
            origen: this.state.origen,
            destino: this.state.destino,
            tarifa: this.state.tarifa,
            banco: this.state.banco,
            hora: this.state.hora,
            cantPasajeros: this.state.cantPasajeros,
            vehiculo: this.state.vehiculo,
            estado: "Pedida",
            pasajero: this.props.navigation.getParam('PasajeroId', 'No-Id')
          })

          console.warn(cola)
 
          if (cola.data.success) {
            this.setState({
              origen: '',
              destino: '',
              tarifa: '',
              banco: '',
              hora: new Date(),
              cantPasajeros: '',
              vehiculo: ''
            })
          }
 
         }catch (error) {
            console.warn('Error al pedir la cola')
         }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (

            <View style={styles.container}>

                <TextInput
                    placeholder="Origen"
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
                <DatePicker
                    date = {this.state.hora}
                    mode = 'datetime'
                    placeholder = 'seleccione fecha y hora'
                    format = "YYYY-MM-DD hh:mm:ss"
                    minDate = {new Date()}
                    confirmBtnText = "Confirm"
                    cancelBtnText = "Cancel"
                    customStyles = {{
                      dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                      },
                      dateInput: {
                        marginLeft: 36
                      }
                    }}
                    onDateChange = {(date) => {this.updateValue(date, 5)}}
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
                <TouchableOpacity
                    style={styles.buttonSubmit}
                    onPress={() => this.submit(1)}
                >
                    <Text style={{ color: "white", fontSize: 20 }}>Solicitar</Text>
                </TouchableOpacity>
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
    buttonSubmit: {
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
    Picker: {
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
