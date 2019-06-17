import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Container, Icon, Text } from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';

const { width, height } = Dimensions.get('window')


class ColasAceptadasConductor extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            currentUser: {
                userId: undefined, 
                userEmail: undefined
            }
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
        } catch (error) {
            console.warn(error)
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                {this.state.currentUser.userId != undefined && (<View>
                <Text style={{ color: 'white' }}>{this.state.currentUser.userId}</Text>
                <Text style={{ color: 'white' }}>{this.state.currentUser.userEmail}</Text></View>)}
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