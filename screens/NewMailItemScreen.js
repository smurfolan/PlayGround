import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import NewMailItemDecisionButton from '../components/NewMailItemDecisionButton'
import Enums from '../constants/Enums'
import Constants from '../constants/Constants'

export default class NewMailItemScreen extends React.Component{
    static navigationOptions = {
        header: null,
    };

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

    _submitMailItemResponse(responseValue){
        console.log("Response is:" + responseValue)
        // 1. Submit the response to firebase
        // 2. Stop the timer
        // 3. Disable/Hide buttons
        // 4. Replace timer value with ACCEPTED/DECLINED/REPEATED
            // 4.1 If Accepted/Declined timeout for few seconds and navigate to MailboxItems screen
            // 4.2 If REPEATED do nothing. We expected a new notification at some point/or not. 
    }

    render() {
        return (
            <ImageBackground
                source={{uri: this.state.snapshotUrl}}
                style={styles.container}>
                <View style={styles.overlayContainer}>
                    <View style={styles.top}>
                        <Text style={styles.header}>0 0 : 1 3</Text>
                    </View>
                    <View style={styles.menuContainer}>
                        <NewMailItemDecisionButton
                            onPress={() => {this._submitMailItemResponse(Enums.NEW_MAIL_ITEM_RESPONSE.DECLINED)}}
                            itemImage={Constants.NEW_MAIL_ITEM_IMAGES.DECLINED}/>
                        <NewMailItemDecisionButton
                            onPress={() => {this._submitMailItemResponse(Enums.NEW_MAIL_ITEM_RESPONSE.REPEAT)}}
                            itemImage={Constants.NEW_MAIL_ITEM_IMAGES.REPEAT}/>
                        <NewMailItemDecisionButton
                            onPress={() => {this._submitMailItemResponse(Enums.NEW_MAIL_ITEM_RESPONSE.ACCEPTED)}}
                            itemImage={Constants.NEW_MAIL_ITEM_IMAGES.ACCEPTED}/>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        height: '100%'
    },
    overlayContainer:{
        flex: 1,
        backgroundColor: 'rgba(47, 163, 218, .4)'
    },
    top:{
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header:{
        color: '#fff',
        fontSize: 28,
        borderColor: '#fff',
        borderWidth: 2,
        padding: 20,
        paddingLeft: 40,
        paddingRight: 40,
        backgroundColor: 'rgba(255,255,255,.1)'
    },
    menuContainer:{
        height: '40%',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})