import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    FlatList,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { Icon } from 'native-base';
import { ListItem } from 'react-native-elements'
import MapView from 'react-native-maps';
import moment, { isMoment } from 'moment';
import SockectIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

const { width, height } = Dimensions.get('window')
const halfHeight = height / 3
const HEIGHT = height;

class HistorialPasajero extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            currentUser: {
                userId: undefined,
                userEmail: undefined
            },
            historial: null,
            selected: null
        }

        this.socketTerminarCola = SockectIOClient('https://colapp-asa.herokuapp.com/terminarcola', {
            transports: ['websocket'],
            forceNew: true
        });
    }

    async componentWillMount(){
        await this.getCurrentUser();
        await this._getColasTerminadas();
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

    async _getColasTerminadas() {
        try {
            var url = `https://colapp-asa.herokuapp.com/pasajero/verHistorial/${this.state.currentUser.userId}`;
            
            let response = await axios.get(url);

            if (response.data.success) {
                this.setState({
                    loaded: true,
                    historial: response.data.data
                })
            }

            return response.data.success

        } catch (error) {
            return false
        }
    }

    componentDidMount() {

    }

    _itemSelected(selection) {
        this.setState({
            selected: selection
        })
    }

    render() {
        if (!this.state.loading) {
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

                    <View style={{ height: 20 }}>
                        <Text note style={{ marginLeft: 20 }}>Conductor: {this.state.selected.c.email}</Text>
                    </View>

                    <View style={{ marginTop: 20, alignItems: 'center' }}>
                        <TouchableOpacity onPress={() => this._itemSelected(null)}><Icon name="arrow-round-back" style={{ color: '#E6890F', fontSize: 100 }} /></TouchableOpacity>
                    </View>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={this.state.historial}
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

export default HistorialPasajero;

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