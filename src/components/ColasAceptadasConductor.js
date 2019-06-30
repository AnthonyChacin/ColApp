import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ActivityIndicator, Text, FlatList, ToastAndroid, TouchableOpacity } from 'react-native';
import { Container, Button, Content } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { ListItem } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import SockectIOClient from 'socket.io-client';
import axios from 'axios';
import { Broadcast } from 'pubnub-react/lib/broadcast';
import MapView from 'react-native-maps';
import moment, { isMoment } from 'moment';
import { thisExpression } from '@babel/types';
import IconVector from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window')
const halfHeight = height / 3
const HEIGHT = height;

class ColasAceptadasConductor extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            currentUser: {
                userId: undefined,
                userEmail: undefined
            },
            colasAceptadas: undefined,
            selected: null,
            puntoEncuentro: {
                idCola: undefined,
                referencia: undefined
            }
        }

        this.socketColaAceptada = SockectIOClient('https://colapp-asa.herokuapp.com/colaaceptada', {
            transports: ['websocket'],
            forceNew: true
        });

        this.socketLlegadaConductor = SockectIOClient('https://colapp-asa.herokuapp.com/llegadaconductor', {
            transports: ['websocket'],
            forceNew: true
        });

        this.socketTerminarCola = SockectIOClient('https://colapp-asa.herokuapp.com/terminarcola', {
            transports: ['websocket'],
            forceNew: true
        });
    }

    _selectedPuntoEncuentro(idCola, referencia) {
        this.setState({
            puntoEncuentro: {
                idCola: idCola,
                referencia: referencia
            }
        })
    }

    async componentDidMount() {

        this.socketColaAceptada.on('Cola Aceptada', (obj) => {
            if (!!obj.conductor && !!obj.pasajero) {
                if (obj.conductor == this.state.currentUser.userId) {
                    this._getColasAceptadas()
                }
            }
        })

        this.socketTerminarCola.on('Terminar Cola', (obj) => {
            if (!!obj.conductor && !!obj.pasajero) {
                if (obj.conductor == this.state.currentUser.userId) {
                    this._getColasAceptadas()
                    ToastAndroid.show('El pasajero ha marcado la cola como finalizada.', ToastAndroid.SHORT);
                    this.setState({
                        selected: {
                            _id: this.state.selected._id,
                            origen: this.state.selected.origen,
                            destino: this.state.selected.destino,
                            tarifa: this.state.selected.tarifa,
                            banco: this.state.selected.banco,
                            hora: this.state.selected.hora,
                            cantPasajeros: this.state.selected.cantPasajeros,
                            vehiculo: this.state.selected.vehiculo,
                            referencia: this.state.selected.referencia,
                            estado: "Terminada",
                            p: {
                                _id: this.state.selected.p._id,
                                email: this.state.selected.p.email
                            }
                        }
                    })
                }
            }
        })
    }

    async componentWillMount() {
        try {
            const userId = await AsyncStorage.getItem('userId');
            const userEmail = await AsyncStorage.getItem('userEmail');
            this.setState({
                currentUser: {
                    userId: userId,
                    userEmail: userEmail
                }
            })
            this._getColasAceptadas()
        } catch (error) {
            console.warn(error)
        }
    }

    async _getColasAceptadas() {
        try {

            var url = `https://colapp-asa.herokuapp.com/conductor/verColasAceptadas/${this.state.currentUser.userId}`;

            let response = await axios.get(url);
            console.warn(response.data.data)
            if (response.data.success && response.data.data.length > 0) {

                this.setState({
                    loaded: true,
                    colasAceptadas: response.data.data
                })
            } else {
                this.setState({
                    loaded: true
                })
            }

            return response.data.success

        } catch (error) {
            return false
        }
    }

    _itemSelected(selection) {
        this.setState({
            selected: selection
        })
    }

    async _lleguePuntoEncuentro(idCola, idPasajero, selected) {
        try {
            var url = `https://colapp-asa.herokuapp.com/conductor/llegadaPuntoEncuentro/`

            let request = await axios.post(url, {
                idCola
            })

            if (request.data.success) {

                this.socketLlegadaConductor.emit('Llego Conductor', { success: true, pasajero: idPasajero, conductor: this.state.currentUser.userId })
                this._getColasAceptadas()
                ToastAndroid.show('Se le hará saber al pasajero que ya estás en el punto de encuentro.', ToastAndroid.SHORT);

                this.setState({
                    selected: {
                        _id: selected._id,
                        origen: selected.origen,
                        destino: selected.destino,
                        tarifa: selected.tarifa,
                        banco: selected.banco,
                        hora: selected.hora,
                        cantPasajeros: selected.cantPasajeros,
                        vehiculo: selected.vehiculo,
                        referencia: selected.referencia,
                        estado: "LlegoConductor",
                        p: {
                            _id: selected.p._id,
                            email: selected.p.email
                        }
                    }
                })
            }

        } catch (error) {

        }
    }

    render() {
        if (this.state.loaded && this.state.selected == null && this.state.colasAceptadas == null) {
            return (
                <View style={styles.container}>
                    <IconVector style={{ margin: 10, color: 'white' }} size={50} name="car-crash" />
                    <Text note style={{ alignSelf: "center", color: "white" }}>No ha aceptado ninguna cola</Text>
                </View>
            )
        }
        else if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                </View>
            )
        } else if (this.state.selected !== null) {
            console.warn(this.state.selected.p.email)
            return (
                <View style={{ height: (HEIGHT * 0.9), marginTop: 0 }}>
                    {(!!this.state.puntoEncuentro.idCola && !!this.state.puntoEncuentro.referencia && this.state.puntoEncuentro.idCola == this.state.selected._id) ? (
                        <Container>
                            <View style={styles.Container}>
                                <MapView style={styles.map}
                                    region={{
                                        latitude: this.state.selected.origen.latitude,
                                        longitude: this.state.selected.origen.longitude,
                                        latitudeDelta: this.state.selected.origen.latitudeDelta,
                                        longitudeDelta: this.state.selected.origen.longitudeDelta
                                    }}>
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: this.state.selected.origen.latitude,
                                            longitude: this.state.selected.origen.longitude
                                        }}>
                                    </MapView.Marker>
                                </MapView>
                            </View>
                            <Text note style={{ marginLeft: 20, height: 20, marginRight: 20, alignSelf: 'center' }}>Ubicación actual del pasajero</Text>
                            <IconVector color="#E6880F" style={{ alignSelf: 'center', marginBottom: width * 0.05, marginTop: width * 0.05 }} name="map-signs" size={width * 0.1} />
                            <View style={{
                                flex: 1,
                                alignItems: 'center',
                            }}>
                                <TouchableOpacity><Text style={{ alignSelf: 'center', color: 'rgb(20,20,20)', marginLeft: width*0.05, marginRight: width*0.05, textAlign: 'center' }}>{this.state.puntoEncuentro.referencia}</Text></TouchableOpacity>
                                <Button
                                    style={styles.back}
                                    onPress={() => this.setState({
                                        puntoEncuentro: {
                                            idCola: undefined,
                                            referencia: undefined
                                        }
                                    })}
                                >
                                    <IconVector style={{ color: 'white', marginLeft: width*0.08}} name="angle-left" size={width * 0.08} />
                                </Button>
                            </View>
                        </Container>
                    ) : (
                            <Container>
                                <View style={styles.Container}>
                                    <MapView style={styles.map}
                                        region={{
                                            latitude: this.state.selected.origen.latitude,
                                            longitude: this.state.selected.origen.longitude,
                                            latitudeDelta: this.state.selected.origen.latitudeDelta,
                                            longitudeDelta: this.state.selected.origen.longitudeDelta
                                        }}>
                                        <MapView.Marker
                                            coordinate={{
                                                latitude: this.state.selected.origen.latitude,
                                                longitude: this.state.selected.origen.longitude
                                            }}>
                                        </MapView.Marker>
                                    </MapView>
                                </View>
                                <Button
                                    onPress={() => this._selectedPuntoEncuentro(this.state.selected._id, this.state.selected.referencia)}
                                    style={styles.buttonPE} transparent><IconVector style={{ color: 'white' }} name="walking" size={width * 0.08} /><Text style={{ color: 'white' }}>Punto de encuentro</Text><IconVector style={{ color: 'white' }} name="car-side" size={width * 0.08} />
                                </Button>
                                <View style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Destino: {this.state.selected.destino}</Text>
                                </View>
                                <View style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Tarifa: {this.state.selected.tarifa} Bs.</Text>
                                </View>

                                <View style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Fecha y Hora: {moment(`${this.state.selected.hora}`).format('DD-MM-YYYY, hh:mm a')}</Text>
                                </View>

                                <View style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Vehículo: {this.state.selected.vehiculo}</Text>
                                </View>

                                <View style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Banco: {this.state.selected.banco}</Text>
                                </View>

                                <View style={{ height: 20 }}>
                                    <Text note style={{ marginLeft: 20 }}>Cantidad de Pasajeros: {this.state.selected.cantPasajeros}</Text>
                                </View>

                                <View style={{ height: 20 }}>
                                    {!!this.state.selected.p.email && (<Text note style={{ marginLeft: 20, fontSize: 13 }}>Pasajero: {this.state.selected.p.email}</Text>)}
                                </View>

                                <Container>
                                    <Content style={{ margin: width * 0.05, height: height * 0.5 }}>
                                        <Button
                                            disabled={(this.state.selected.estado == "LlegoConductor" || this.state.selected.estado == "Terminada") ? true : false}
                                            style={{
                                                height: height * 0.07,
                                                marginBottom: height * 0.02,
                                                borderRadius: 5,
                                                backgroundColor: this.state.selected.estado == "Aceptada" ? 'rgb(230,136,15)' : 'rgba(20,20,20,0.2)'
                                            }}
                                            full light onPress={() => this._lleguePuntoEncuentro(this.state.selected._id, this.state.selected.p._id, this.state.selected)}
                                        >
                                            <Icon name={this.state.selected.estado == "Terminada" ? "check-circle" : "map-marked-alt"} style={{ fontSize: width * 0.1, marginRight: 10 }} color={(this.state.selected.estado == "LlegoConductor" || this.state.selected.estado == "Terminada") && 'rgba(20,20,20,0.2)'} />
                                            {(this.state.selected.estado == "LlegoConductor" || this.state.selected.estado == "Aceptada") &&
                                                (<Text style={{ fontSize: height * 0.03, color: (this.state.selected.estado == "LlegoConductor" || this.state.selected.estado == "Terminada") && 'rgba(20,20,20,0.2)' }}>Llegué al punto de encuentro</Text>)
                                            }
                                            {this.state.selected.estado == "Terminada" &&
                                                (<Text style={{ fontSize: height * 0.03, color: (this.state.selected.estado == "LlegoConductor" || this.state.selected.estado == "Terminada") && 'rgba(20,20,20,0.2)' }}>Cola terminada</Text>)
                                            }
                                        </Button>
                                        <Button style={styles.buttonBack} full light onPress={() => this._itemSelected(null)}><Icon name="angle-left" style={{ color: 'white', fontSize: width * 0.1, marginRight: 10 }} /><Text style={{ fontSize: height * 0.03, color: 'white' }}>Atrás</Text></Button>
                                    </Content>
                                </Container>
                            </Container>
                        )}
                </View>
            )
        } else {
            return (
                <Container>

                    <ListItem
                        leftIcon={<Button transparent><Icon name="tint" size={width * 0.1} color='rgba(230,136,15,0.5)' /><Text>   En curso</Text></Button>}
                        rightIcon={<Button transparent><Text>Terminada   </Text><Icon name="tint" size={width * 0.1} color='gray' /></Button>}
                        containerStyle={{
                            borderBottomWidth: 0,
                            marginTop: 0
                        }}
                    />
                    <FlatList
                        data={this.state.colasAceptadas}
                        renderItem={({ item }) =>
                            <ScrollView>
                                <ListItem
                                    leftIcon={
                                        (
                                            (item.estado == 'Aceptada' && <Icon name='hourglass-start' size={width * 0.1} />) ||
                                            (item.estado == 'LlegoConductor' && <Icon name='hourglass-half' size={width * 0.1} />) ||
                                            (item.estado == 'Terminada' && <Icon name='hourglass-end' size={width * 0.1} /* color="white" */ />)
                                        )
                                    }
                                    rightIcon={
                                        (item.estado == 'LlegoConductor' && <Icon name='car-side' size={width * 0.1} />) ||
                                        (item.estado == 'Terminada' && <Icon name='check-circle' size={width * 0.1} /* color="white" */ />)
                                    }
                                    containerStyle={{
                                        backgroundColor: (item.estado == 'Aceptada' || item.estado == 'LlegoConductor') ? 'rgba(230,136,15,0.5)' : 'gray',
                                        borderBottomWidth: 2,
                                        marginTop: 2
                                    }}
                                    title={item.destino}
                                    subtitle={moment(`${item.hora}`).format('DD-MM-YYYY, hh:mm a')}
                                    onPress={() => this._itemSelected(item)}
                                />
                                {item._id == this.state.colasAceptadas[this.state.colasAceptadas.length - 1]._id && (
                                    <Text></Text>
                                )}
                            </ScrollView>
                        }
                    />
                </Container>
            )
        }
    }
}


export default ColasAceptadasConductor;

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
    back: {
        marginTop: height * 0.1,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "gray",
        color: "white",
        alignItems: 'center',
        alignSelf: "center",
        borderRadius: 25,
        width: (width * 0.2)
    },
    map: {
        left: 0,
        right: 0,
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    buttonBack: {
        height: height * 0.07,
        marginBottom: height * 0.02,
        borderRadius: 5,
        backgroundColor: 'gray'
    },
    buttonPE: {
        paddingHorizontal: 16,
        paddingTop: 0,
        paddingBottom: 0,
        backgroundColor: "gray",
        alignItems: "center",
        color: "white",
        alignSelf: "center",
        marginTop: 5,
        marginBottom: 0,
        borderRadius: 25,
        width: (width * 0.8)
    },
})