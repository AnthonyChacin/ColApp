import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Container, Text } from 'native-base';

class HeaderPasajero extends React.Component {

    render() {
        return (

            <TouchableOpacity
                style={styles.button}
            >
                <Text style={{ color: "white", fontSize: 20 }}>Solicita tu cola</Text>
            </TouchableOpacity>

        )
    }
}

export default HeaderPasajero;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#C4C9BB',
        height: 30
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