import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from 'react-native';
import MapView from 'react-native-maps';
import { Container, Header, DeckSwiper, Card, CardItem, View, Text, Left, Body } from 'native-base';
import axios from 'axios';

const { width, height } = Dimensions.get('window')
const halfHeight = height / 3

class ListadoColas extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            colas: null,
        }

    }

    async darCola(id) {
        try {

            var url = 'http://192.168.137.35:8080/conductor/darCola'

            let request = await axios.post(url, {
                idCola: id,
                idConductor: this.props.navigation.getParam('ConductorId', 'No-Id')
            })

            console.warn(request)

        } catch (error) {
            console.warn(error)
        }
    }

    async componentDidMount() {

        try {

            var url = 'http://192.168.137.35:8080/conductor/verColasPedidas';

            let response = await axios.get(url);

            this.setState({
                loaded: true,
                colas: response.data.data
            })

            return response.data.data
            //console.warn(response.data)

        } catch (error) {
            console.warn('Hola')
        }

        //console.warn(this.state.colas)

    }

    render() {
        return (
            <Container style={{ backgroundColor: 'rgb(20,20,20)', width }}>
                {!this.state.loaded && (
                    <View style={styles.container}>
                        <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                    </View>
                )}
                {this.state.colas != null && (
                    <DeckSwiper
                        dataSource={this.state.colas}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
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
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text>Destino: {item.destino}</Text>
                                            <Text note>Pasajero: {item.p.email} </Text>
                                        </Body>
                                    </Left>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20 }}>Tarifa: </Text>
                                    <Text>{item.tarifa} Bs.</Text>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20 }}>Hora: </Text>
                                    <Text>{item.hora}</Text>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20 }}>Vehículo: </Text>
                                    <Text>{item.vehiculo}</Text>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{ marginLeft: 20, marginBottom: 20 }}>Banco: </Text>
                                    <Text style={{ marginBottom: 20 }}>{item.banco}</Text>
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
            </Container>
        )
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
        /* backgroundColor: '#82826C' */
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgb(20,20,20)'
    },
    map: {
        left: 0,
        right: 0,
        ...StyleSheet.absoluteFillObject,
    },
    card: {
        backgroundColor: '#82826C',
        marginBottom: 10,
        marginLeft: '2%',
        width: '96%',
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
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 25,
        width: 300
    }
})