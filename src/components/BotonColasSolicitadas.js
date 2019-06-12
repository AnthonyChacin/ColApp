import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Text } from 'native-base';

class BotonColasSolicitadas extends React.Component {

    render() {
        return (
            <TouchableOpacity
                style={styles.button}
            >
                <Text style={{ color: "white", fontSize: 20 }}>Colas Solicitadas</Text>
            </TouchableOpacity>
        )
    }
}

export default BotonColasSolicitadas;

const styles = StyleSheet.create({
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

