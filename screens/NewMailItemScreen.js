import React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

export default class NewMailItemScreen extends React.Component{
    constructor(props) {
        super(props);
        responseWilBeExpectedUntil = new Date(props.navigation.state.params.waitForResponseUntil)
        startWaitingResponseFrom = new Date(new Date().toUTCString())

        this.state = { 
          mailItemId: props.navigation.state.params.mailItemId,
          mailboxId: props.navigation.state.params.mailboxId, 
          waitForResponseUntil: props.navigation.state.params.waitForResponseUntil,
          snapshotUrl: props.navigation.state.params.snapshotUrl,
          ocrText: props.navigation.state.params.ocrText,
          countDownSeconds: (responseWilBeExpectedUntil-startWaitingResponseFrom)/1000         
        };
      }

    componentDidMount(){
        console.log("New Mail Item scree was mounted")    
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>mailItemId: {this.state.mailItemId}</Text>
                <Text>mailboxId: {this.state.mailboxId}</Text>
                <Text>waitForResponseUntil: {this.state.waitForResponseUntil}</Text>
                <Text>snapshotUrl: {this.state.snapshotUrl}</Text>
                <Text>countDownSeconds: {this.state.countDownSeconds}</Text>
                <Text>ocrText: {this.state.ocrText}</Text>
            </View>
        );
    }
}