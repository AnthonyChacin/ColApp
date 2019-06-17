import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Text, Left, Body, Header, Icon, Title, Button } from 'native-base';

class MenuButton extends React.Component {

    render() {
        return (
            <Button transparent
                onPress={() => { this.props.navigation.openDrawer() }}
            >
                <Icon name='menu' />
            </Button>
        )
    }
}

export default MenuButton;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#E6890F'
    },
    button: {
        alignItems: "center",
        color: "white",
        alignSelf: "center",
        margin: 0,
        borderRadius: 0,
        width: 300,
        backgroundColor: 'rgb(20,20,20)',
        left: 0
    }
})

