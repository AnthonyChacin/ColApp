import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions,
    ToastAndroid
} from 'react-native';
import { PixelRatio } from 'react-native'
import MapView from 'react-native-maps';
import { Container, DeckSwiper, Card, CardItem, View, Text, Left, Body } from 'native-base';
import axios from 'axios';
import SockectIOClient from 'socket.io-client';
import PubNubReact from 'pubnub-react';

const { width, height } = Dimensions.get('window')
const halfHeight = height / 3

class ListadoColas extends React.Component {

    constructor(props) {
        super(props);

        this.pubnub = new PubNubReact({
            publishKey: 'pub-c-d7d3663d-7ef8-4800-96e5-68eb8f5b4041',
            subscribeKey: 'sub-c-336faa76-86ed-11e9-9f15-ba4fa582ffed'
        });
        
        this.pubnub.subscribe({
            channels: ['ColasPedidas'],
            withPresence: true
        });

        this.state = {
            loaded: false,
            colas: null
        }

        this.socket = SockectIOClient('http://192.168.137.35:8080');
    }

    async componentWillMount() {
        await this._getColas();
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
            <Container style={{ backgroundColor: 'rgb(20,20,20)', paddingBottom: '1%', height }}>
                {!this.state.loaded && (
                    <View style={styles.container}>
                        <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                    </View>
                )}
                {this.state.colas != null && (
                    <DeckSwiper
                        dataSource={this.state.colas}
                        renderItem={item =>
                            <Card style={{ elevation: 3, flex: 1 }}>

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
                                <Text note style={{ marginLeft: 20 }}>Ubicación actual del pasajero</Text>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text>Destino: {item.destino}</Text>
                                        </Body>
                                    </Left>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20 }}>Pasajero: </Text>
                                    <Text> {item.p.email} </Text>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20 }}>Tarifa: </Text>
                                    <Text>{item.tarifa} Bs.</Text>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20 }}>Fecha y Hora: </Text>
                                    <Text>{item.hora}</Text>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20 }}>Vehículo: </Text>
                                    <Text>{item.vehiculo}</Text>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20 }}>Banco: </Text>
                                    <Text>{item.banco}</Text>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20 }}>Cantidad de Pasajeros: </Text>
                                    <Text>{item.cantPasajeros}</Text>
                                </CardItem>

                                <CardItem style={{ justifyContent: 'center' }}>
                                    <TouchableOpacity
                                        style={styles.button}
                                        onPress={() => this.darCola(item._id)}
                                    >
                                        <Text style={{ color: "white", fontSize: 20 }}>Dar Cola</Text>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                        }
                    />
                )}
                {ToastAndroid.show('No hay ninguna solicitud de cola actualmente', ToastAndroid.SHORT)}
            </Container>
        )
    }

    async _getColas() {
        try {

            var url = 'http://192.168.137.35:8080/conductor/verColasPedidas';

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


    async darCola(id) {
        try {

            var url = 'http://192.168.137.35:8080/conductor/darCola'

            let request = await axios.post(url, {
                idCola: id,
                idConductor: this.props.navigation.getParam('ConductorId', 'No-Id')
            })

            if (request.data.success) {
                this._getColas()
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
        width: 300
    }
})