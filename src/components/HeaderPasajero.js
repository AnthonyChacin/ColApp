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

class HeaderPasajero extends React.Component {

    constructor(props) {
        super(props);
        this.state = { currentTab: 0 }
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
                <Tabs initialPage={this.state.currentTab} onChangeTab={({ i }) => this.setState({ currentTab: i })} tabContainerStyle={{ backgroundColor: 'white' }} tabBarUnderlineStyle={{ borderBottomWidth: 5, borderBottomColor: '#E6890F' }}>
                    <Tab
                        heading={
                            <TabHeading style={this.state.currentTab == 0 ? styles.activeTabStyle : styles.tabStyle}>
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
                            <TabHeading style={this.state.currentTab == 1 ? styles.activeTabStyle : styles.tabStyle}>
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
                            <TabHeading style={this.state.currentTab == 2 ? styles.activeTabStyle : styles.tabStyle}>
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