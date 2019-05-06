import React from 'react';
import { Text, View } from 'react-native';
import Constants from '../../../constants/Constants'

export default class TrustedMailItemsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
            observedMailboxId: props.navigation.state.params.mailboxId,
            trustedMailboxItems: [],
            isLoading: true
        };
        this.props.navigation.addListener('willFocus', this.onTabSelected)
    }

    onTabSelected = () => {
        fetch(Constants.FUNCTIONS_URL.GET_MAILBOX_ITEMS.replace('{MAILBOX_ID}', this.state.observedMailboxId).replace('{REQUEST_ANONYMOUS}', false))
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({
                mailboxItems: responseJson,
                isLoading: false
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    render() {
        return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Trusted mail!</Text>
        </View>
        );
    }
}