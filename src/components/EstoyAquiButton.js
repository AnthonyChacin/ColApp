import React, { Component } from 'react';
import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { Text, Left, Body, Header, Icon, Title, Button } from 'native-base';

class EstoyAquiButton extends React.Component {
    constructor(props) {
        super(props);
        this.pressed = false;
        this.state = {
        // disabled = false
      }
  };
   /* _handleNav = () => {
        if (!this.pressed){
           this.pressed = true;
           this.setState({ this.props.navigation.openDrawer()});
       }*/
    

    render() {
        
          /*  <Button transparent
                onPress={() => { this.props.navigation.openDrawer() }}
            >
                <Icon name='EstoyAqui' />
            </Button>*/
            
             if (!this.pressed)
             return(
                 <TouchableOpacity style={styles.button}/*onPress={ this.props.navigation.openDrawer()} */>
                     <Text style={styles.buttonDisabled}> Estoy Aquí </Text>
                 </TouchableOpacity>
             )
         else
             return(
                 <View>
                     <Text>Estoy Aquí  </Text>
                 </View>
             )
        
    }
}

export default EstoyAquiButton;

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#E6890F'
    },
    button: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: "#E6880F",
        alignItems: "center",
        color: "white",
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 10,
        borderRadius: 25,
        width: 300
    },
    buttonDisabled: {
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'rgba(20,20,20,0.3)',
        alignItems: "center",
        color: "white",
        alignSelf: "center",
        marginTop: 2,
        marginBottom: 10,
        borderRadius: 25,
        width: 300
    }
})
