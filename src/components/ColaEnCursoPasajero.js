import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    ToastAndroid,
    ScrollView
} from 'react-native';
import MapView from 'react-native-maps';
import { Container, View, Text, Body, ListItem, CheckBox } from 'native-base';
import axios from 'axios';
import SockectIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window')
const halfHeight = height / 3
const HEIGHT = height;

class ColaEnCursoPasajero extends React.Component {
    constructor(props) {

        super(props);

        this.state = {
            loaded: false,
            currentUser: {
                userId: undefined,
                userEmail: undefined
            },
            cola: null
        }

        this.socket = SockectIOClient('https://colapp-asa.herokuapp.com');

    }

    async componentWillMount(){ 
        await this.getCurrentUser();
        await this._getColasEnCurso()
    }

    async componentDidMount() {
        this.socket.on('Cola Pedida', (obj) => {
            if (obj) {
                this._getColasEnCurso();
            }
        })
    }

    async getCurrentUser() {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const userEmail = await AsyncStorage.getItem('userEmail');
            this.setState({
                currentUser: {
                    userId: userId,
                    userEmail: userEmail
                }
            })
        } catch (error) {
            console.warn(error)
        }
    }

    async _getColasEnCurso() {
        try {
            const horaLocal = new Date().toISOString()
            console.warn(horaLocal)
            var url = `https://colapp-asa.herokuapp.com/pasajero/verColasEnCurso/${this.state.currentUser.userId}-${horaLocal}`;
            console.warn(url)
            let response = await axios.get(url);
            console.warn(response)
            if (response.data.success) {
                this.setState({
                    loaded: true,
                    colas: response.data.data
                })
            }

            return response.data.success

        } catch (error) {
            return false
        }
    }

    render() {

        return (
            <Container style={{ backgroundColor: 'rgb(20,20,20)', height: (HEIGHT * 0.8) }}>
                {!this.state.loaded && (
                    <View style={styles.container}>
                        <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                    </View>
                )}
                {this.state.cola != null && (
                    <View style={{ height: (HEIGHT * 0.9), marginTop: 0 }}>
                        <View style={styles.Container}>
                            <MapView style={styles.map}
                                region={{
                                    latitude: this.state.cola.origen.latitude,
                                    longitude: this.state.cola.origen.longitude,
                                    latitudeDelta: this.state.cola.origen.latitudeDelta,
                                    longitudeDelta: this.state.cola.origen.longitudeDelta
                                }}>
                                <MapView.Marker
                                    coordinate={{
                                        latitude: this.state.cola.origen.latitude,
                                        longitude: this.state.cola.origen.longitude
                                    }}>
                                </MapView.Marker>
                            </MapView>
                        </View>
                        <Text note style={{ marginLeft: 20, height: 20, marginTop: 0 }}>Punto de encuentro</Text>
                        <View style={{ height: 20 }}>
                            <Text note style={{ marginLeft: 20 }}>Tarifa: {this.state.cola.tarifa} Bs.</Text>
                        </View>

                        <View style={{ height: 20 }}>
                            <Text note style={{ marginLeft: 20 }}>Fecha y Hora: {this.state.cola.hora}</Text>
                        </View>

                        <View style={{ height: 20 }}>
                            <Text note style={{ marginLeft: 20 }}>Vehículo: {this.state.cola.vehiculo}</Text>
                        </View>

                        <View style={{ height: 20 }}>
                            <Text note style={{ marginLeft: 20 }}>Banco: {this.state.cola.banco}</Text>
                            <Text></Text>
                        </View>

                        <View style={{ height: 20 }}>
                            <Text note style={{ marginLeft: 20 }}>Cantidad de Pasajeros: {this.state.cola.cantPasajeros}</Text>
                        </View>
                        <ListItem style={{ marginLeft: 1 }}>
                            <CheckBox checked={true} color="#E6880F" />
                            <Body>
                                <Text style={{ color: 'white' }}>Aceptada</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ marginLeft: 1 }}>
                            <CheckBox checked={false} color="#E6880F" />
                            <Body>
                                <Text style={{ color: 'white' }}>El conductor llegó</Text>
                            </Body>
                        </ListItem>
                    </View>
                )}
            </Container>
        )
    }
}

export default ColaEnCursoPasajero;

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: halfHeight,
        marginLeft: 0
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)',
        ...StyleSheet.absoluteFillObject,
    },
    button: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#E6880F",
        alignItems: "center",
        color: "white",
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 10,
        borderRadius: 25,
        width: 300,
        height: 20
    },
    map: {
        left: 0,
        right: 0,
        ...StyleSheet.absoluteFillObject,
        flex: 1
    }
})