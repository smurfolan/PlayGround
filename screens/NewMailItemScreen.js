import React from 'react';
import { Text, View, ImageBackground, StyleSheet } from 'react-native';
import NewMailItemDecisionButton from '../components/NewMailItemDecisionButton'

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
                            itemImage={'https://cdn.iconscout.com/icon/free/png-256/cross-decline-false-reject-wrong-no-sign-6030.png'}/>
                        <NewMailItemDecisionButton
                            itemImage={'https://cdn.iconscout.com/icon/free/png-256/repeat-single-button-arrow-clockwise-37879.png'}/>
                        <NewMailItemDecisionButton
                            itemImage={'https://cdn2.iconfinder.com/data/icons/social-buttons-2/512/thumb_up-128.png'}/>
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