import React from 'react';
import {
    ActivityIndicator,
    StatusBar,
    StyleSheet,
    View
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';

import AsyncStorage from '@react-native-community/async-storage';

class Logout extends React.Component {

    constructor(props) {
        super(props);
        this._signOutAsync();
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        //this.reset._reset(
        this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Registry'}))
    };

    _reset(){
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                this.props.navigation.navigate('Registry')
            ]
        }))
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
            </View>
        )
    }

}

export default Logout;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)'
    }
})
