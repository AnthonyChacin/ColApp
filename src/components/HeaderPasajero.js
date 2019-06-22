import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView
} from 'react-native';
import { Container, Text, Left, Body, Header, Icon, Title, Button, Tab, Tabs, TabHeading } from 'native-base';
import MenuButton from './MenuButton';
import FormColaView from './FormColaView';
import ColaEnCursoPasajero from './ColaEnCursoPasajero';
import HistorialPasajero from './historialPasajero';
import IconVector from 'react-native-vector-icons/FontAwesome5';
import SockectIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

class HeaderPasajero extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            currentUser: {
                userId: undefined,
                userEmail: undefined
            }
        }

        this.socket = SockectIOClient('https://colapp-asa.herokuapp.com/colapedida', {
            transports: ['websocket'],
            forceNew: true
        });
    }

    async getCurrentUser() {
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

    async componentWillMount() {
        await this.getCurrentUser();
    }

    async componentDidMount() {
        this.socket.on('Cola Pedida', (obj) => {
            console.warn(obj)
            if (obj.success && !!obj.data) {
                
                if (obj.data == this.state.currentUser.userId) {
                    this.setState({ currentTab: 1 })
                    console.warn(this.state.currentTab)
                }
            }
        })
    }

    render() {
        return (
            <Container>
                <Header hasTabs style={styles.header}>
                    <Left>
                        <MenuButton {...this.props} />
                    </Left>
                    <Body>
                        <Title>Pasajero</Title>
                    </Body>
                </Header>
                <Tabs page={this.state.currentTab} initialPage={this.state.currentTab} onChangeTab={({ i }) => this.setState({ currentTab: i })} tabContainerStyle={{ backgroundColor: 'white' }} tabBarUnderlineStyle={{ borderBottomWidth: 5, borderBottomColor: '#E6890F' }}>
                    <Tab
                        heading={
                            <TabHeading style={{backgroundColor: 'white'}}>
                                <Icon style={this.state.currentTab == 0 ? { color: '#E6890F' } : { color: 'gray' }} name="compass" />
                                <Text style={this.state.currentTab == 0 ? { color: '#E6890F' } : { color: 'gray' }}>Solicitud</Text>
                            </TabHeading>
                        }
                    >
                        <ScrollView>
                            <FormColaView {...this.props} />
                        </ScrollView>
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading style={{backgroundColor: 'white'}}>
                                <Icon style={this.state.currentTab == 1 ? { color: '#E6890F' } : { color: 'gray' }} name="clock" />
                                <Text style={this.state.currentTab == 1 ? { color: '#E6890F' } : { color: 'gray' }}>En curso</Text>
                            </TabHeading>
                        }
                    >
                        <ScrollView>
                            <ColaEnCursoPasajero {...this.props} />
                        </ScrollView>
                    </Tab>
                    <Tab
                        heading={
                            <TabHeading style={{backgroundColor: 'white'}}>
                                <Icon style={this.state.currentTab == 2 ? { color: '#E6890F' } : { color: 'gray' }} name="checkmark-circle" />
                                <Text style={this.state.currentTab == 2 ? { color: '#E6890F' } : { color: 'gray' }}>Historial</Text>
                            </TabHeading>
                        }
                    >
                        <ScrollView>
                            <HistorialPasajero {...this.props} />
                        </ScrollView>
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}

export default HeaderPasajero;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#E6890F'
    },
    activeTabStyle: {
        backgroundColor: 'white'
    },
    tabStyle: {
        backgroundColor: 'white'
    }
})