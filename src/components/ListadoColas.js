import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import { Container, Header, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';

var colas = [];


//const {colas} = this.props.navigation.

class ListadoColas extends React.Component {

    constructor() {
        super();
    }

    async darCola(id){
        try{

            var url = 'http://10.0.2.2:8080/conductor/darCola'

            let request = await axios.post(url, {
                idCola: id,
                idConductor: this.props.navigation.getParam('ConductorId', 'No-Id')
            })
            
            console.warn(request)

        }catch(error){
            console.warn(error)
        }
    }

    async componentDidMount(){

        try{

            var url = 'http://10.0.2.2:8080/conductor/verColasPedidas';

            let response = await axios.get(url);

            colas = response.data.data
            console.warn(this.state.colas)
        }catch(error){
            console.warn(error)
        } 
    }

    render() {
            return (
                <Container style={{backgroundColor: 'rgb(20,20,20)'}}>
                    <DeckSwiper
                        dataSource={colas}
                        renderItem={item =>
                            <Card style={{ elevation: 3 }}>
                                <CardItem>
                                    <Left>
                                        <Body>
                                            <Text>{item.origen} - {item.destino}</Text>
                                            <Text note>Pasajero: {item.p.email} </Text>
                                        </Body>
                                    </Left>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{marginLeft: 20}}>Tarifa: </Text>
                                    <Text>{item.tarifa}</Text>
                                </CardItem>

                                <CardItem cardBody>
                                    <Text note style={{marginLeft: 20}}> Hora: </Text>
                                    <Text>{item.hora}</Text>
                                </CardItem>
                        
                                <CardItem cardBody>
                                    <Text note style={{marginLeft: 20, marginBottom: 20}}>Vehiculo: </Text>
                                    <Text style={{ marginBottom: 20 }}>{item.vehiculo}</Text>
                                </CardItem>
                        
                                <CardItem>
                                    <TouchableOpacity 
                                        style = {styles.button}
                                        onPress = {() => this.darCola(item._id)}
                                    >
                                        <Text style = {{color: "white", fontSize: 20}}>Dar Cola</Text>
                                    </TouchableOpacity>
                                </CardItem>
                            </Card>
                        }
                    />

                </Container>
            )
    }
}

export default ListadoColas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4C9BB',
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
        }
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