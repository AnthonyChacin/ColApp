import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Container, DeckSwiper, Card, CardItem, Text, Left, Right, Body, Header, Icon, Title, Button } from 'native-base';

class BotonColasSolicitadas extends React.Component {

    render() {
        return (
            <Header style={styles.header}>
                <Left>
                    {/* <Button transparent
                        onPress={() => this.props.navigation.navigate("DrawerOpen")}
                    >
                        <Icon name='menu' />
                    </Button> */}
                </Left>
                <Body>
                    <Title style={styles.title}>
                        Colas Solicitadas
                    </Title>
                </Body>
            </Header>
        )
    }
}

export default BotonColasSolicitadas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E6880F',
    },
    header: {
        backgroundColor: '#E6880F'
    },
    title: {
        fontSize: 18,
        backgroundColor: '#E6880F'
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

