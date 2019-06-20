import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    View, 
    Dimensions
} from 'react-native';
import { Container, Text, Left, Body, Header, Icon, Title, Button, Segment, Right, Tab, Tabs, TabHeading, Content } from 'native-base';
import MenuButton from './MenuButton';
import IconVector from 'react-native-vector-icons/FontAwesome5';
import ListadoColas from './ListadoColas';
import ColasAceptadasConductor from './ColasAceptadasConductor';
import SockectIOClient from 'socket.io-client';
import AsyncStorage from '@react-native-community/async-storage';

const HEIGHT = Dimensions.get('window').height;

class HeaderConductor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            currentUser: {
                userId: undefined,
                userEmail: undefined
            },
        }

        this.socket = SockectIOClient('https://colapp-asa.herokuapp.com');
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

    async componentDidMount(){
        if (!!this.state.currentUser.userId) {
            this.socket.on('ColaAceptada', (obj) => {
                if (obj == this.state.currentUser.userId) {
                    this.setState({currentPage: 1})
                }
            })
        }
    }

    render() {
        console.warn(this.state.currentUser)
        return (
            <Container>
                <Header hasSegment style={styles.header}>
                    <Left>
                        <MenuButton {...this.props} />
                    </Left>
                    <Body>
                        <Title>Conductor</Title>
                    </Body>
                    <Right>
                        <Segment style={{ backgroundColor: '#E6890F' }}>
                            <Button first active={this.state.currentPage == 0 ? true : false} style={styles.button} onPress={() => {
                                this.setState({ currentPage: 0 })
                            }}><IconVector style={{ margin: 10 }} color={this.state.currentPage == 0 ? 'white' : 'gray'} size={40} name="clock" /></Button>
                            <Button last active={this.state.currentPage == 1 ? true : false} style={styles.button} onPress={() => {
                                this.setState({ currentPage: 1 })
                            }}><IconVector style={{ margin: 10 }} color={this.state.currentPage == 1 ? 'white' : 'gray'} size={40} name="check-circle" /></Button>
                        </Segment>
                    </Right>
                </Header>
                {this.state.currentPage == 0 ? 
                (<ListadoColas {...this.props} />)
                :
                (<ColasAceptadasConductor {...this.props} />)
                }
            </Container>
        )
    }
}

export default HeaderConductor;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#E6890F',
        height: HEIGHT*0.1
    },
    activeTabStyle: {
        backgroundColor: 'white'
    },
    tabStyle: {
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: '#E6890F',
        borderColor: '#E6890F'
    }
})

