import React, { Component } from 'react';
import { Container, Header, Tab, Tabs, TabHeading, Icon, Text } from 'native-base';
import FormColaView from '../components/FormColaView';

export default class MenuConductor extends Component {
    render() {
        return (
            <Container>
                <Header hasTabs />
                <Tabs>
                    <Tab heading={<TabHeading><Icon name="hand" /> <Text>Solicitadas</Text> </TabHeading>}>
                        
                    </Tab>
                </Tabs>
            </Container>
        )
    }
}