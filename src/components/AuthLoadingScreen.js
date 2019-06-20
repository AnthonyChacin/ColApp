import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: undefined,
            userType: undefined
        }
    }
    
    componentWillMount(){
        this._isAuthenticated();
    }

    _isAuthenticated = async () => {
        try{
            const id = await AsyncStorage.getItem('userId');
            const userType = await AsyncStorage.getItem('userType');

            this.setState({userId: id, userType: userType})

            if(!!this.state.userId && !!this.state.userType){
                if(this.state.userType == 'Pasajero'){
                    this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                            //NavigationActions.navigate({routeName: 'Pasajero'})
                            this.props.navigation.navigate('Pasajero')
                        ]
                    }))
                }else if(this.state.userType == 'Conductor'){
                    this.props.navigation.dispatch(StackActions.reset({
                        index: 0,
                        actions: [
                            //NavigationActions.navigate({routeName: 'Conductor'})
                            this.props.navigation.navigate('Conductor')
                        ]
                    }))
                }
            }else{
                this.props.navigation.navigate('Registry')
            }
        }catch(error){
            this.props.navigation.navigate('Registry')
        }
    }

    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
            </View>
        )
    }

}

export default AuthLoadingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)'
    }
})