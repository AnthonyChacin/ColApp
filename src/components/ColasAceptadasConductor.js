import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ActivityIndicator, Text, FlatList, ToastAndroid } from 'react-native';
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
            selected: null
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
            if (response.data.success) {

                this.setState({
                    loaded: true,
                    colasAceptadas: response.data.data
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

        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                </View>
            )
        } else if (this.state.selected !== null) {
            console.warn(this.state.selected.p.email)
            return (
                <View style={{ height: (HEIGHT * 0.9), marginTop: 0 }}>
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
                    <Text note style={{ marginLeft: 10, height: 20, marginTop: 0 }}>Punto de encuentro</Text>
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
                        {!!this.state.selected.p.email && (<Text note style={{ marginLeft: 20 }}>Pasajero: {this.state.selected.p.email}</Text>)}
                    </View>

                    <Container>
                        <Content style={{ margin: width * 0.05, height: height * 0.3 }}>
                            <Button
                                disabled={(this.state.selected.estado == "LlegoConductor" || this.state.selected.estado == "Terminada") ? true : false}
                                style={{
                                    height: height * 0.1,
                                    marginBottom: height * 0.02,
                                    borderRadius: 5,
                                    backgroundColor: this.state.selected.estado == "Aceptada" ? 'rgb(230,136,15)' : 'rgba(20,20,20,0.2)'
                                }}
                                full light onPress={() => this._lleguePuntoEncuentro(this.state.selected._id, this.state.selected.p._id, this.state.selected)}
                            >
                                <Icon name={this.state.selected.estado == "Terminada" ? "check-circle" : "map-marked-alt"} style={{ fontSize: width * 0.1, marginRight: 10 }} color={(this.state.selected.estado == "LlegoConductor" || this.state.selected.estado == "Terminada") && 'rgba(20,20,20,0.2)'} />
                                {this.state.selected.estado == "LlegoConductor" &&
                                    (<Text style={{ fontSize: height * 0.03, color: (this.state.selected.estado == "LlegoConductor" || this.state.selected.estado == "Terminada") && 'rgba(20,20,20,0.2)' }}>Llegué al punto de encuentro</Text>)
                                }
                                {this.state.selected.estado == "Terminada" &&
                                    (<Text style={{ fontSize: height * 0.03, color: (this.state.selected.estado == "LlegoConductor" || this.state.selected.estado == "Terminada") && 'rgba(20,20,20,0.2)' }}>Cola terminada</Text>)
                                }
                            </Button>
                            <Button style={styles.buttonBack} full light onPress={() => this._itemSelected(null)}><Icon name="angle-left" style={{ color: 'white', fontSize: width * 0.1, marginRight: 10 }} /><Text style={{ fontSize: height * 0.03, color: 'white' }}>Atrás</Text></Button>
                        </Content>
                    </Container>
                </View>
            )
        } else {
            return (
                <Container>
                    <ListItem
                        leftIcon={<Button transparent><Icon name="tint" size={width * 0.1} color='rgba(230,136,15,0.5)' /><Text>   En curso</Text></Button>}
                        rightIcon={<Button transparent><Text>Terminada   </Text><Icon name="tint" size={width * 0.1} color='gray' /></Button>}
                    />
                    <ScrollView>
                        <FlatList
                            data={this.state.colasAceptadas}
                            renderItem={({ item }) =>
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
                                    /* titleStyle={{color: (item.estado == "Terminada" && ('white'))}}
                                    subtitleStyle={{color: (item.estado == "Terminada" && ('white'))}} */
                                    subtitle={moment(`${item.hora}`).format('DD-MM-YYYY, hh:mm a')}
                                    onPress={() => this._itemSelected(item)}
                                />
                            }
                        />
                    </ScrollView>
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
    map: {
        left: 0,
        right: 0,
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    buttonBack: {
        height: height * 0.1,
        marginBottom: height * 0.02,
        borderRadius: 5,
        backgroundColor: 'gray'
    }
})