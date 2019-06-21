import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    ToastAndroid
} from 'react-native';
import MapView from 'react-native-maps';
import { Container, DeckSwiper, Card, CardItem, View, Text, Left, Body } from 'native-base';
import axios from 'axios';
import SockectIOClient from 'socket.io-client';
import PubNubReact from 'pubnub-react';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const { width, height } = Dimensions.get('window')
const halfHeight = height / 3
const HEIGHT = height;

class ListadoColas extends React.Component {

    constructor(props) {

        super(props);

        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-d7d3663d-7ef8-4800-96e5-68eb8f5b4041',
            subscribeKey: 'sub-c-336faa76-86ed-11e9-9f15-ba4fa582ffed'
        });

        this.state = {
            loaded: false,
            colas: null,
            currentUser: { userId: undefined, userEmail: undefined }
        }

        this.socket = SockectIOClient('https://colapp-asa.herokuapp.com');
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

    async componentWillMount() {
        await this._getColas();
        await this.getCurrentUser();
    }

    async componentDidMount() {

        this.socket.on('Cola Pedida', (obj) => {
            if (obj) {
                this._getColas();
            }
        })
    }

    render() {
        return (
            <Container style={{ backgroundColor: 'rgb(20,20,20)'}}>
                {!this.state.loaded && (
                    <View style={styles.container}>
                        <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                    </View>
                )}
                {(this.state.colas != null && !!this.state.currentUser.userEmail) && (
                    <DeckSwiper
                        dataSource={this.state.colas}
                        renderItem={item =>
                            <Card>
                                <CardItem>
                                    <View style={styles.Container}>
                                        <MapView style={styles.map}
                                            region={{
                                                latitude: item.origen.latitude,
                                                longitude: item.origen.longitude,
                                                latitudeDelta: item.origen.latitudeDelta,
                                                longitudeDelta: item.origen.longitudeDelta
                                            }}>
                                            <MapView.Marker
                                                coordinate={{
                                                    latitude: item.origen.latitude,
                                                    longitude: item.origen.longitude
                                                }}>
                                            </MapView.Marker>
                                        </MapView>
                                    </View>
                                </CardItem>
                                <Container style={{ flex: 1 }}>
                                    <Text note style={{ marginLeft: 20, height: 20 }}>Ubicación actual del pasajero</Text>
                                    <CardItem style={{ height: 30 }}>
                                        <Text>Destino: </Text>
                                        <Text style={{ color: '#E6880F' }}>{item.destino}</Text>
                                    </CardItem>

                                    <CardItem cardBody style={{ height: 20 }}>
                                        <Text note style={{ marginLeft: 20 }}>Pasajero: </Text>
                                        <Text style={{ fontSize: 14 }}> {item.p.email} </Text>
                                    </CardItem>

                                    <CardItem cardBody style={{ height: 20 }}>
                                        <Text note style={{ marginLeft: 20 }}>Tarifa: </Text>
                                        <Text>{item.tarifa} Bs.</Text>
                                    </CardItem>

                                    <CardItem cardBody style={{ height: 20 }}>
                                        <Text note style={{ marginLeft: 20 }}>Fecha y Hora: </Text>
                                        <Text>{moment(`${item.hora}`).format('DD-MM-YYYY, hh:mm a')}</Text>
                                    </CardItem>

                                    <CardItem cardBody style={{ height: 20 }}>
                                        <Text note style={{ marginLeft: 20 }}>Vehículo: </Text>
                                        <Text>{item.vehiculo}</Text>
                                    </CardItem>

                                    <CardItem cardBody style={{ height: 20 }}>
                                        <Text note style={{ marginLeft: 20 }}>Banco: </Text>
                                        <Text>{item.banco}</Text>
                                    </CardItem>

                                    <CardItem cardBody style={{ height: 20 }}>
                                        <Text note style={{ marginLeft: 20 }}>Cantidad de Pasajeros: </Text>
                                        <Text>{item.cantPasajeros}</Text>
                                    </CardItem>

                                    <CardItem style={{ justifyContent: 'center'}}>
                                        <TouchableOpacity
                                            disabled={this.state.currentUser.userEmail == item.p.email ? true : false}
                                            style={this.state.currentUser.userEmail == item.p.email ? styles.buttonDisabled : styles.button}
                                            onPress={() => this.darCola(item._id, item.p._id)}
                                        >
                                            <Text style={{ color: "white", fontSize: 20 }}>Dar Cola</Text>
                                        </TouchableOpacity>
                                    </CardItem>
                                </Container>
                            </Card>
                        }
                    />
                )}
            </Container>
        )
    }

    async _getColas() {
        try {

            var url = 'https://colapp-asa.herokuapp.com/conductor/verColasPedidas';

            let response = await axios.get(url);

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


    async darCola(idCola, idPasajero) {
        try {

            var url = 'https://colapp-asa.herokuapp.com/conductor/darCola'

            let request = await axios.post(url, {
                idCola: idCola,
                idConductor: this.state.currentUser.userId
            })

            if (request.data.success) {
                this.socket.emit('Cola Pedida', true);
                this.socket.emit('ColaAceptada', this.state.currentUser.userId);
                this._getColas();
                ToastAndroid.show('La solicitud ha sido aceptada con éxito', ToastAndroid.SHORT);
                //ToastAndroid.show('El pasajero está siendo notificado', ToastAndroid.SHORT);
            }

            return request.data.success

        } catch (error) {
            return false
        }
    }
}

export default ListadoColas;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
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
    map: {
        left: 0,
        right: 0,
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    card: {
        backgroundColor: '#82826C',
        marginBottom: '30%',
        marginLeft: '2%',
        width,
        height,
        shadowColor: '#E6880F',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 3,
            height: 3
        },
        ...StyleSheet.absoluteFillObject,
    },
    cardText: {
        color: 'black',
        padding: 10,
        fontSize: 15
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
        width: (width*0.8)
    },
    buttonDisabled: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'rgba(20,20,20,0.3)',
        alignItems: "center",
        color: "white",
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 10,
        borderRadius: 25,
        width: (width*0.8)
    }
})