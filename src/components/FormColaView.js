import React, { Component } from 'react';
import {
    TextInput,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Picker,
    Dimensions,
    ActivityIndicator
} from 'react-native';

import DatePicker from 'react-native-datepicker';

import axios from 'axios';

import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import SockectIOClient from 'socket.io-client';

const { width, height } = Dimensions.get('window')
const halfHeight = height / 2
const ASPECT_RATIO = width / height
const LATITUDE_DELTA = 0.01
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

class FormColaView extends React.Component {

    constructor() {
        super();
        this.state = {
            loaded: false,
            initialPosition: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0
            },
            initialMarker: {
                latitude: 0,
                longitude: 0
            },
            destino: '',
            tarifa: '',
            banco: '',
            hora: new Date(),
            vehiculo: '',
            cantPasajeros: ''
        }

        this.socket = SockectIOClient('http://192.168.137.1:8080');
    }

    async componentDidMount() {
        await Geolocation.getCurrentPosition((position) => {
            var lat = parseFloat(position.coords.latitude)
            var long = parseFloat(position.coords.longitude)

            var initialRegion = {
                latitude: lat,
                longitude: long,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }

            var marker = {
                latitude: lat,
                longitude: long
            }

            this.setState({ loaded: true, initialPosition: initialRegion, initialMarker: marker })

        }, (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 200000, maximumAge: 0 })

    }

    updateValue(param, i) {
        switch (i) {
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

    prueba() {
        return true
    }

    async submit() {
        try {

            if (this.state.loaded && this.state.destino != "" && this.state.tarifa != "" &&
                this.state.banco != "" && this.state.hora != "" && this.state.cantPasajeros != "") {

                var url = 'http://192.168.137.1:8080/pasajero/pedirCola';

                let cola = await axios.post(url, {
                    origen: this.state.initialPosition,
                    destino: this.state.destino,
                    tarifa: this.state.tarifa,
                    banco: this.state.banco,
                    hora: this.state.hora,
                    cantPasajeros: this.state.cantPasajeros,
                    vehiculo: this.state.vehiculo,
                    estado: "Pedida",
                    pasajero: this.props.navigation.getParam('PasajeroId', 'No-Id')
                })

                if (cola.data.success) {
                    
                    this.socket.emit('Cola Pedida', true);

                    this.setState({
                        destino: '',
                        tarifa: '',
                        banco: '',
                        hora: new Date(),
                        cantPasajeros: '',
                        vehiculo: ''
                    })

                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        const { hora } = this.state
        return (

            <View>
                {!this.state.loaded && (
                    <View style={styles.Container}>
                        <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                    </View>
                )}
                {this.state.loaded && (<View>
                    <View style={styles.Container}>
                        <MapView style={styles.map}
                            region={this.state.initialPosition}>
                            <MapView.Marker
                                coordinate={this.state.initialMarker}>
                            </MapView.Marker>
                        </MapView>
                        <Text>Tu ubicación actual</Text>
                    </View>
                    <View style={styles.container}>
                        <TextInput
                            placeholder="Destino"
                            placeholderTextColor='rgba(20,20,20,0.3)'
                            style={styles.textInput}
                            editable={true}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.updateValue(text, 2)}
                            value={this.state.destino}

                        />
                        <TextInput
                            placeholder="Tarifa"
                            placeholderTextColor='rgba(20,20,20,0.3)'
                            style={styles.textInput}
                            editable={true}
                            underlineColorAndroid="transparent"
                            onChangeText={(text) => this.updateValue(text, 3)}
                            value={this.state.tarifa}
                            keyboardType="numeric"
                        />
                        <Picker
                            selectedValue={this.state.banco}
                            style={styles.Picker}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ banco: itemValue })
                            }>
                            <Picker.Item label="Seleccione el banco..." value="No especificó" />
                            <Picker.Item label="Mercantil" value="Mercantil" />
                            <Picker.Item label="Provincial" value="Provincial" />
                            <Picker.Item label="Banco del Caribe" value="Banco del Caribe" />
                            <Picker.Item label="Banesco" value="Banesco" />
                            <Picker.Item label="Banco Fondo Común" value="Banco Fondo Común" />
                            <Picker.Item label="Banco Venezolano de Crédito" value="Banco Venezolano de Crédito" />
                        </Picker>
                        <DatePicker
                            date={this.state.hora}
                            mode='datetime'
                            placeholder='seleccione fecha y hora'
                            format="DD-MM-YYYY hh:mm"
                            minDate={this.state.hora}
                            confirmBtnText="Confirm"
                            cancelBtnText="Cancel"
                            customStyles={{

                                dateIcon: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 4,
                                    marginLeft: 0
                                },
                                dateInput: {
                                    marginLeft: 36,
                                    color: "white",
                                }
                            }}
                            onDateChange={(date) => { this.updateValue(date, 5) }}
                        />
                        <TextInput
                            placeholder="Cantidad de Pasajeros"
                            placeholderTextColor='rgba(20,20,20,0.3)'
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
                            <Picker.Item label="Seleccione tipo de vehículo..." value="No especificó" />
                            <Picker.Item label="Carro" value="Carro" />
                            <Picker.Item label="Moto" value="Moto" />
                        </Picker>
                        <TouchableOpacity
                            style={styles.buttonSubmit}
                            onPress={() => this.submit(1)}
                        >
                            <Text style={{ color: "white", fontSize: 20 }}>Solicitar</Text>
                        </TouchableOpacity>
                    </View>
                </View>)}
            </View>

        );
    }
}

export default FormColaView;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: halfHeight

    },
    map: {
        left: 0,
        right: 0,
        ...StyleSheet.absoluteFillObject,
        flex: 1,

    },
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
        width: 300
    },
    textInput: {
        alignSelf: 'center',
        paddingHorizontal: 16,
        marginTop: 10,
        marginBottom: 20,
        backgroundColor: "#fff",
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
