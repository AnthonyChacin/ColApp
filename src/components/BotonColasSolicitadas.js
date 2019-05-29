import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Container, DeckSwiper, Card, CardItem, Text, Left, Body } from 'native-base';

class BotonColasSolicitadas extends React.Component {

    render() {
        return (
            <Container style={styles.container}>
                <TouchableOpacity
                    style={styles.button}
                >
                    <Text style={{ color: "white", fontSize: 20 }}>Colas Solicitadas</Text>
                </TouchableOpacity>
            </Container>
        )
    }
}

export default BotonColasSolicitadas;

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
        alignItems: "center",
        color: "white",
        alignSelf: "center",
        margin: 0,
        borderRadius: 0,
        width: 300,
        backgroundColor: 'rgb(20,20,20)'
    }
})

