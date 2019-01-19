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

          countDownSeconds: (responseWilBeExpectedUntil-startWaitingResponseFrom)/1000,
          stringFormattedCountDownValue:'00:00',
          decisionOnEmail: null
        };
    }

    _startCountDown(){
        var self = this;
        if(self.state.countDownSeconds > 0){
            var refreshId = setInterval(function(){
                var updatedTime = self.state.countDownSeconds - 1
                self.setState({countDownSeconds: updatedTime})
                self.setState({stringFormattedCountDownValue: "00:" + ("00" + updatedTime).slice(-2)})
                if(updatedTime <= 0){
                    self.setState({stringFormattedCountDownValue: Constants.TIME_PASSED})
                    clearInterval(refreshId);
                }

                if(self.state.decisionOnEmail !== null){
                    clearInterval(refreshId);
                    self._submitMailItemResponse(self.state.decisionOnEmail)
                }
            }, 1000)
        }
        else{
            self.setState({stringFormattedCountDownValue: Constants.TIME_PASSED})
        }
    }

    componentDidMount(){
        this._startCountDown() 
    }

    _submitMailItemResponse(responseValue){
        this._submitHttpUpdateRequest()
        var self = this;

        switch(responseValue) {
            case 1:
                self.setState({stringFormattedCountDownValue: Constants.NEW_MAIL_ITEM_DECISION_VERBAL.ACCEPTED})
                break;
            case 0:
                self.setState({stringFormattedCountDownValue: Constants.NEW_MAIL_ITEM_DECISION_VERBAL.DECLINED})
                break;
            case 3:
                self.setState({stringFormattedCountDownValue: Constants.NEW_MAIL_ITEM_DECISION_VERBAL.REPEAT})
                break;
        }
        
        self._navigateToMailItemsScreen();
    }

    _navigateToMailItemsScreen(){
        var self = this
        setTimeout(function(){
            self.props.navigation.navigate('Home')
        }, 3000)
    }

    _submitHttpUpdateRequest(){
        const body = { 
            mailItemId: this.state.mailItemId, 
            updatedStatus: this.state.decisionOnEmail 
        };
 
        fetch(Constants.FUNCTIONS_URL.UPDATE_MAIL_ITEM_STATUS, {
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(json => console.log(json))
            .catch((error) => {
                console.log(error)
            });
    }

    render() {
        return (
            <ImageBackground
                source={{uri: this.state.snapshotUrl}}
                style={styles.container}>
                <View style={styles.overlayContainer}>
                    <View style={styles.top}>
                        <Text style={styles.header}>{this.state.stringFormattedCountDownValue}</Text>
                    </View>
                    {this.state.countDownSeconds > 0 && this.state.decisionOnEmail === null ?
                    <View style={styles.menuContainer}>
                        <NewMailItemDecisionButton
                            onPress={() => {this.setState({decisionOnEmail:Enums.NEW_MAIL_ITEM_RESPONSE.DECLINED})}}
                            itemImage={Constants.NEW_MAIL_ITEM_IMAGES.DECLINED}/>
                        <NewMailItemDecisionButton
                            onPress={() => {this.setState({decisionOnEmail:Enums.NEW_MAIL_ITEM_RESPONSE.REPEAT})}}
                            itemImage={Constants.NEW_MAIL_ITEM_IMAGES.REPEAT}/>
                        <NewMailItemDecisionButton
                            onPress={() => {this.setState({decisionOnEmail:Enums.NEW_MAIL_ITEM_RESPONSE.ACCEPTED})}}
                            itemImage={Constants.NEW_MAIL_ITEM_IMAGES.ACCEPTED}/>
                    </View>
                    : null
                    }                 
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