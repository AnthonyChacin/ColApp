import React, { Component } from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    FlatList
} from 'react-native';
import { Container, View } from 'native-base';
import { List, ListItem } from 'react-native-elements'

const { width, height } = Dimensions.get('window')
const halfHeight = height / 3
const HEIGHT = height;

class HistorialPasajero extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            historial: [
                {
                    "destino": "UNIMET",
                    "hora": "15-06-2019 3:00 p.m."
                },
                {
                    "destino": "SANTA FE",
                    "hora": "16-06-2019 2:00 p.m."
                }
            ]


        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <Container>
                {!this.state.loading && (
                    <View style={styles.container}>
                        <ActivityIndicator size='large' color="orange" style={{ padding: 20 }} />
                    </View>
                )}
                {!!this.state.historial && (
                    <View>
                        <List>
                            <FlatList
                                data={this.state.historial}
                                renderItem={({ item }) => (

                                    <ListItem
                                        title={item.destino}
                                        subtitle={item.hora}
                                    />
                                )}
                            />
                        </List>
                    </View>
                )}
            </Container>
        )
    }
}

export default HistorialPasajero;

const styles = StyleSheet.create({
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        width,
        height: halfHeight,
        marginLeft: 0
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(20,20,20)',
        ...StyleSheet.absoluteFillObject,
    }
})