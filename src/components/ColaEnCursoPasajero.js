import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    TouchableOpacity,
    ProgressBarAndroid
} from 'react-native';
import MapView from 'react-native-maps';
import { Container, View, Text, Body, ListItem, CheckBox, Icon } from 'native-base';
import axios from 'axios';
import SockectIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import moment, { isMoment } from 'moment';

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
            cola: null,
            isChangeCurrentTime: true
        }

        this.socketColaPedida = SockectIOClient('https://colapp-asa.herokuapp.com/colapedida', {
            transports: ['websocket'],
            forceNew: true
        });

        this.socketColaAceptada = SockectIOClient('https://colapp-asa.herokuapp.com/colaaceptada', {
            transports: ['websocket'],
            forceNew: true
        });

        this.socketLlegadaConductor = SockectIOClient('https://colapp-asa.herokuapp.com/llegadaconductor', {
            transports: ['websocket'],
            forceNew: true
        });

    }

    async componentWillMount() {
        await this.getCurrentUser();
        await this._getColasEnCurso()
    }

    async componentDidMount() {
        this.socketColaPedida.on('Cola Pedida', (obj) => {
            if (obj) {
                this._getColasEnCurso();
            }
        })

        this.socketColaAceptada.on('Cola Aceptada', (obj) => {
            if (!!obj.conductor && !!obj.pasajero) {
                if (obj.pasajero == this.state.currentUser.userId) {
                    this._getColasEnCurso();
                }
            }
        })

        this.socketLlegadaConductor.on('Llego Conductor', (obj) => {
            if (!!obj.conductor && !!obj.pasajero) {
                if (obj.pasajero == this.state.currentUser.userId) {
                    this._getColasEnCurso();
                }
            }
        })

        setInterval(() => (
            this.setState(previousState => (
                {
                    isChangeCurrentTime: !previousState.isChangeCurrentTime
                }
            ))
        ), 1000);

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
            const horaLocal = moment().format();
            console.warn(horaLocal)
            var url = `https://colapp-asa.herokuapp.com/pasajero/verColasEnCurso/${this.state.currentUser.userId}-${horaLocal}`;
            console.warn(url)
            let response = await axios.get(url);
            console.warn(response)
            if (response.data.success) {
                this.setState({
                    loaded: true,
                    cola: response.data.data
                })
            }

            return response.data.success

        } catch (error) {
            return false
        }
    }

    render() {

        if (!this.state.isChangeCurrentTime) {
            let currentTime = moment().format()
            if (!!this.state.cola) {
                if (currentTime > moment(`${this.state.cola.hora}`).format() && this.state.cola.estado == "Pedida") {
                    this._getColasEnCurso()
                }
            }
        }

        return (
            <Container style={{ backgroundColor: 'rgb(20,20,20)', flex: 1 }}>
                {!this.state.loaded && (
                    <View style={styles.container}>
                        <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                    </View>
                )}
                {!!this.state.cola && (
                    <View style={{ marginTop: 0, marginBottom: 20, flex: 1 }}>
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
                        <Text note style={{ marginLeft: 10, height: 20, marginTop: 0 }}>Punto de encuentro</Text>
                        <View style={{ height: 20 }}>
                            <Text note style={{ marginLeft: 20 }}>Destino: {this.state.cola.destino}</Text>
                        </View>
                        <View style={{ height: 20 }}>
                            <Text note style={{ marginLeft: 20 }}>Tarifa: {this.state.cola.tarifa} Bs.</Text>
                        </View>

                        <View style={{ height: 20 }}>
                            <Text note style={{ marginLeft: 20 }}>Fecha y Hora: {moment(`${this.state.cola.hora}`).format('DD-MM-YYYY, hh:mm a')}</Text>
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
                        <View style={{ height: 20 }}>
                            {(this.state.cola.estado == 'Aceptada' || this.state.cola.estado == 'LlegoConductor')
                                ?
                                <Text note style={{ marginLeft: 20 }}>Conductor: {this.state.cola.c.email}</Text>
                                :
                                <Text note style={{ marginLeft: 20 }}>Conductor: esperando por alguno ...</Text>
                            }
                        </View>
                        <ListItem style={{ marginLeft: 1 }}>
                            <CheckBox checked={(this.state.cola.estado == 'Pedida' || this.state.cola.estado == 'Aceptada' || this.state.cola.estado == 'LlegoConductor') ? true : false} color="#E6880F" />
                            <Body>
                                <Text style={{ color: 'white' }}>Pedida</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ marginLeft: 1 }}>
                            <CheckBox checked={(this.state.cola.estado == 'Aceptada' || this.state.cola.estado == 'LlegoConductor') ? true : false} color="#E6880F" />
                            <Body>
                                <Text style={{ color: 'white' }}>Aceptada</Text>
                            </Body>
                        </ListItem>
                        <ListItem style={{ marginLeft: 1 }}>
                            <CheckBox checked={this.state.cola.estado == 'LlegoConductor' ? true : false} color="#E6880F" />
                            <Body>
                                <Text style={{ color: 'white' }}>El conductor llegó</Text>
                            </Body>
                        </ListItem>
                        <View style={{ height: 40, alignItems: 'center', marginBottom: 10 }}>
                            <TouchableOpacity
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'rgba(0,0,0,0.2)',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: 100,
                                    height: 50,
                                    backgroundColor: '#E6880F',
                                    borderRadius: 50,
                                    marginBottom: 10,
                                    marginTop: 10
                                }}
                            >
                                <Icon name={"checkmark-circle"} size={30} color="#01a699" />
                            </TouchableOpacity>
                        </View>
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