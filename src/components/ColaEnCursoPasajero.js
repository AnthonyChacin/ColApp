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
import { Container, DeckSwiper, Card, CardItem, View, Text, Left, Body, Thumbnail, ListItem, CheckBox } from 'native-base';
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
            cola: {
                destino: 'Santa Fe',
                origen: {
                    latitude: 10.4993502,
                    longitude: -66.7843985,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.005625
                },
                tarifa: 3450,
                hora: '28-06-2019 08:00',
                vehiculo: 'Carro',
                banco: 'Provincial',
                cantPasajeros: 1
            },
        }

        this.socket = SockectIOClient('https://colapp-asa.herokuapp.com');

    }

    render() {

        return (
            <Container style={{ backgroundColor: 'rgb(20,20,20)', height: (HEIGHT * 0.751) }}>
                {!this.state.loaded && (
                    <View style={styles.container}>
                        <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                    </View>
                )}
                {this.state.cola != null && (

                    <Card style={{ height: (HEIGHT * 0.75), marginTop: 0 }}>
                        <CardItem>
                            <Left>
                                <Body>
                                    <Text>Destino</Text>
                                    <Text note style={{ color: '#E6880F' }}>{this.state.cola.destino}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                        <CardItem>

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

                        </CardItem>

                        <Container style={{ flex: 1 }}>
                            <ScrollView>
                                <Text note style={{ marginLeft: 20, height: 20, marginTop: 0 }}>Punto de encuentro</Text>
                                <CardItem cardBody style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Tarifa: </Text>
                                    <Text>{this.state.cola.tarifa} Bs.</Text>
                                </CardItem>

                                {/*                     <CardItem cardBody style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Fecha y Hora: </Text>
                                    <Text>{this.state.cola.hora}</Text>
                                </CardItem>

                                <CardItem cardBody style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Vehículo: </Text>
                                    <Text>{this.state.cola.vehiculo}</Text>
                                </CardItem> */}

                                {/*                                 <CardItem cardBody style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Banco: </Text>
                                    <Text>{this.state.cola.banco}</Text>
                                </CardItem>

                                <CardItem cardBody style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Cantidad de Pasajeros: </Text>
                                    <Text>{this.state.cola.cantPasajeros}</Text>
                                </CardItem> */}
                                <ListItem>
                                    <CheckBox checked={true} color="#E6880F" />
                                    <Body>
                                        <Text>Aceptada</Text>
                                    </Body>
                                </ListItem>
                                <ListItem>
                                    <CheckBox checked={false} color="#E6880F" />
                                    <Body>
                                        <Text>El conductor llegó</Text>
                                    </Body>
                                </ListItem>

                            </ScrollView>
                        </Container>
                    </Card>
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
        height: halfHeight
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