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

