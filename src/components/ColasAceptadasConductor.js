import React, { Component } from 'react';
import { StyleSheet, Dimensions, ScrollView, View } from 'react-native';
import { Container, Icon, Text, Card, CardItem} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage';
import EstoyAquiButton  from './EstoyAquiButton';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window')
const halfHeight = height / 3


class ColasAceptadasConductor extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
           // colas: null,
            currentUser: {
                userId: undefined,
                userEmail: undefined
            }
        }
    }

    
    async getCurrentUser(){
        try{
            const userId = await AsyncStorage.getItem('userId');
            const userEmail = await AsyncStorage.getItem('userEmail');
            this.setState({
                currentUser: {
                    userId: userId,
                    userEmail: userEmail
                }
            })
        }catch(error){
            console.warn(error)
        }
    }

    async componentWillMount() {
       // await this._getColas();
        await this.getCurrentUser();
    }
   /* async _getColas() {
        try {

            var url = 'https://colapp-asa.herokuapp.com/conductor/verColasPedidas';

            let response = await axios.get(url);

            if (response.data.success) {
                this.setState({
                    loaded: true,
                    colas: response.data.data
                })
            }

            return response.data.success

        } catch (error) {
            return false
        }
    }*/

    render() {
        return (
            <Container style={styles.container}>
                {this.state.currentUser.userId != undefined && (
                <View>
                    <ScrollView>
                        <Card style={{ elevation: 3, flex: 1 }}>
                            <CardItem>
                             <Text style={{ color: 'white' }}>{this.state.currentUser.userId}</Text>
                             </CardItem>
                         <CardItem>
                            <Text style={{ color: 'white' }}>{this.state.currentUser.userEmail}</Text>
                        </CardItem>
                        <CardItem>
                            <View><EstoyAquiButton {...this.props} /></View>
                        </CardItem> 
                        </Card>                      
                    </ScrollView>     
                </View>)}
            </Container>);
        
                }
}

export default ColasAceptadasConductor;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: halfHeight
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)',
        ...StyleSheet.absoluteFillObject,
    },
    map: {
        left: 0,
        right: 0,
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    card: {
        backgroundColor: '#82826C',
        marginBottom: '30%',
        marginLeft: '2%',
        width,
        height,
        shadowColor: '#E6880F',
        shadowOpacity: 0.2,
        shadowRadius: 1,
        shadowOffset: {
            width: 3,
            height: 3
        },
        ...StyleSheet.absoluteFillObject,
    },
    cardText: {
        color: 'black',
        padding: 10,
        fontSize: 15
    },
    
})