import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Text, Left, Body, Header, Title, Button } from 'native-base';
import IconVector from 'react-native-vector-icons/Entypo';
const { width, height } = Dimensions.get('window')

class MenuButton extends React.Component {

    render() {
        return (
            <Button transparent
                onPress={() => { this.props.navigation.openDrawer() }}
            >
                <IconVector name='menu' color="white" size={width*0.1} />
            </Button>
        )
    }
}

export default MenuButton;


