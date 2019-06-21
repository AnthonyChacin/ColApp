import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Container, Icon, Text } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import SockectIOClient from 'socket.io-client';
import axios from 'axios';

const { width, height } = Dimensions.get('window')


class ColasAceptadasConductor extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            loaded: false,
            currentUser: {
                userId: undefined,
                userEmail: undefined
            },
            colasAceptadas: undefined
        }

        this.socket = SockectIOClient('https://colapp-asa.herokuapp.com');
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
                    colasAceptadas: response.data.data.length
                })
            }
            
            return response.data.success

        } catch (error) {
            return false
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                {this.state.currentUser.userId != undefined && (<View>
                    <Text style={{ color: 'white' }}>{this.state.currentUser.userId}</Text>
                    <Text style={{ color: 'white' }}>{this.state.currentUser.userEmail}</Text></View>)}
                {(this.state.loaded && !!this.state.colasAceptadas) && (
                    <Text style={{ color: 'white' }}>{this.state.colasAceptadas}</Text>)}
            </Container>
        );
    }
}

export default ColasAceptadasConductor;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)',
        color: 'white'
    }
})