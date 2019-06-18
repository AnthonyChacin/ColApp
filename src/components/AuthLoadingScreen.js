import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

class AuthLoadingScreen extends React.Component {

    constructor(props) {
        super(props);
        this._isAuthenticated();
    }

    _isAuthenticated = async () => {
        try{
            const currentUser = await AsyncStorage.getItem('userId');

            console.warn(currentUser)

            this.props.navigation.navigate(currentUser != null ? 'Conductor' : 'Registry')
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