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

const { width, height } = Dimensions.get('window')
const halfHeight = height / 3
const HEIGHT = height;

class HistorialPasajero extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            historial: [

                { "_id": "5d0cdcd9d8211a0017f0e14e", "origen": { "latitude": 10.460896, "longitude": -66.866109, "latitudeDelta": 0.01, "longitudeDelta": 0.005620608899297424 }, "destino": "Unimet", "tarifa": "6000", "banco": "Provincial", "hora": "2019-06-27T07:00:00-04:30", "cantPasajeros": "1", "vehiculo": "Carro", "estado": "Pedida", "pasajero": "5d091bee68ab9f0017cb51f9", "creacionCola": "2019-06-21T09:35:55-04:30" },
                { "_id": "5d0d1b4373a65300170aa001", "origen": { "latitude": 10.3998821, "longitude": -66.8865553, "latitudeDelta": 0.01, "longitudeDelta": 0.005625 }, "destino": "Unimet", "tarifa": "2450", "banco": "Mercantil", "hora": "2019-06-21T16:00:00-04:00", "cantPasajeros": "1", "vehiculo": "Moto", "estado": "Pedida", "pasajero": "5d010180e280a601a8314e76", "creacionCola": "2019-06-21T14:00:34-04:00" },
                { "_id": "5d0cd85bd8211a0017f0e14d", "origen": { "latitude": 10.460896, "longitude": -66.866109, "latitudeDelta": 0.01, "longitudeDelta": 0.005620608899297424 }, "destino": "Unimet", "tarifa": "1000", "banco": "Provincial", "hora": "2019-06-27T07:00:00-04:30", "cantPasajeros": "1", "vehiculo": "Carro", "estado": "Pedida", "pasajero": "5d091bee68ab9f0017cb51f9", "creacionCola": "2019-06-21T09:16:44-04:30" }
            ],
            selected: null
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