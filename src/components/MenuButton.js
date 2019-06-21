import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Text, Left, Body, Header, Icon, Title, Button } from 'native-base';
const { width, height } = Dimensions.get('window')

class MenuButton extends React.Component {

    render() {
        return (
            <Button transparent
                onPress={() => { this.props.navigation.openDrawer() }}
            >
                <Icon name='menu' style={{fontSize: 40}}/>
            </Button>
        )
    }
}

export default MenuButton;


