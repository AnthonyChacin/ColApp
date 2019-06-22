import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View, ActivityIndicator, Text, FlatList, TouchableOpacity } from 'react-native';
import { Container, Icon } from 'native-base';
import { ListItem } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage';
import SockectIOClient from 'socket.io-client';
import axios from 'axios';
import { Broadcast } from 'pubnub-react/lib/broadcast';
import MapView from 'react-native-maps';
import moment, { isMoment } from 'moment';

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

        this.socket = SockectIOClient('https://colapp-asa.herokuapp.com/colaaceptada', {
            transports: ['websocket'],
            forceNew: true
        });
    }

    async componentDidMount() {
        if (!!this.state.currentUser.userId) {
            this.socket.on('ColaAceptada', (obj) => {
                if (obj == this.state.currentUser.userId) {
                    this._getColasAceptadas();
                }
            })
        }
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

    render() {

        if (!this.state.loaded) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                </View>
            )
        } else if (this.state.selected !== null) {
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
                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this._itemSelected(null)}><Icon name="arrow-round-back" style={{ color: '#E6890F', fontSize: 100 }} /></TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={this.state.colasAceptadas}
                    renderItem={({ item }) =>
                        <ListItem
                            title={item.destino}
                            subtitle={moment(`${item.hora}`).format('DD-MM-YYYY, hh:mm a')}
                            onPress={() => this._itemSelected(item)}
                        />
                    }
                />
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
    }
})