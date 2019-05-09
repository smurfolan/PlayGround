import React from 'react';
import { 
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    ActivityIndicator,
    TouchableOpacity } from 'react-native';
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
                trustedMailboxItems: responseJson,
                isLoading: false
            })
        })
        .catch((error) => {
            console.log(error)
        })
    }

    renderSeparator = () => {
        return (<View style={styles.rowsSeparator}></View>)
    }

    renderItem = ({item}) => {
        let icon = require('../../../content/images/mailboxTrustedItem_Icon.jpg')

        return (
        <TouchableOpacity style={styles.touchableContent}
            onPress = {() => this.props.navigation.navigate('TrustedMailItemDetails', {
                mailItemId: item.mailItemId,
                receivedAt: item.receivedAt,
                company: item.rfidCompany,
                person: item.rfidTagOwner,
                personContactInfo: item.rfidTagOwnerContact
            })}>
            <Image style={styles.touchableContentImage} source={icon}/>
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: 'green' }}>
                    {item.receivedAt}
                </Text>
                <Text style={{ fontSize: 13, marginBottom: 15 }}>
                    {item.rfidCompany}
                </Text>
            </View>
        </TouchableOpacity>
        )
    }

    render() {
        return (
        this.state.isLoading
        ?
        <View style={styles.activityIndicator}>
            <ActivityIndicator size="large" color="green" animating />
        </View>
        :
        <View style={styles.container}>
            <FlatList style={{marginTop: 30}}
                data={this.state.trustedMailboxItems}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.mailItemId}
                ItemSeparatorComponent={this.renderSeparator}
            />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    touchableContent:{
        flex: 1,
        flexDirection: 'row',
        marginBottom: 3
    },
    touchableContentImage:{
        width: 40,
        height: 40,
        margin: 5
    },
    rowsSeparator:{
        height: 1,
        width: '100%',
        backgroundColor: 'black'
    },
    activityIndicator:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
  });