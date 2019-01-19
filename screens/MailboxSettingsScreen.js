import React from 'react';
import { Text, View, Button, StyleSheet, Switch, Picker } from 'react-native';

import Constants from '../constants/Constants'

export default class MailboxSettingsScreen extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#C173E8' },
      headerTintColor: '#fff',
      headerRight: (
        <Button title={Constants.SAVE_LBL} color="#2196F3"
          onPress={() => navigation.state.params.updateDefaultBoxSettings()}  
        />
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = { 
        observedMailboxId: props.navigation.state.params.mailboxId,
        mailboxAddress: null,
        mailboxCity: null,
        numberOfMailItems: null,
        zipCode: null,
        openByDefault: false,
        timeToWaitBeforeOpenOrClose: null,
        // The following two are needed to determine if actual update was made
        openByDefaultInitial: false,
        timeToWaitBeforeOpenOrCloseInitial: null
      };
  }

  _updateDefaultBoxSettings = () => {
    if(this.state.openByDefault !== this.state.openByDefaultInitial ||
        this.state.timeToWaitBeforeOpenOrClose !== this.state.timeToWaitBeforeOpenOrCloseInitial){
          const body = { 
            mailboxId: this.state.observedMailboxId, 
            timeToWaitBeforeOpenOrClose: parseInt(this.state.timeToWaitBeforeOpenOrClose),
            openByDefault: this.state.openByDefault
          };

          fetch('https://us-central1-peepnee-backend.cloudfunctions.net/updateDefaultBoxSettings', {
                method: 'post',
                body:    JSON.stringify(body),
                headers: { 'Content-Type': 'application/json' },
            })
            .then(() => {
              this.setState({
                openByDefaultInitial: this.state.openByDefault,
                timeToWaitBeforeOpenOrCloseInitial: this.state.timeToWaitBeforeOpenOrClose
              })

              alert("Saved!")
            })
            .catch((error) => {
                alert("An error occured. Please, try later.")
                console.log(error)
            });
      }
      else{
       alert("There was no change from initial state.") 
      }
  }

  componentDidMount(){
    this.props.navigation.setParams({ updateDefaultBoxSettings: this._updateDefaultBoxSettings });

    fetch(Constants.FUNCTIONS_URL.GET_MAILBOX_SETTINGS + this.state.observedMailboxId)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        mailboxAddress: responseJson.address,
        mailboxCity: responseJson.city,
        numberOfMailItems: parseInt(responseJson.numberOfMailItems),
        zipCode: parseInt(responseJson.zipCode),
        openByDefault: responseJson.openByDefault === true,
        timeToWaitBeforeOpenOrClose: parseInt(responseJson.timeToWaitBeforeOpenOrClose),
        openByDefaultInitial: responseJson.openByDefault === true,
        timeToWaitBeforeOpenOrCloseInitial: parseInt(responseJson.timeToWaitBeforeOpenOrClose)      
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}><Text style={styles.sectionHeaderText}>{Constants.MAILBOX_INFO_LBL}</Text>
        </View>

        <View style={styles.widgetsContainer}>
          <View style={styles.mailboxInfoRow}>
            <Text style={styles.mailboxInfoRowLabel}>{Constants.CITY_LBL}</Text>
            <Text>{this.state.mailboxCity}</Text>
          </View>
          <View style={styles.mailboxInfoRow}>
            <Text style={styles.mailboxInfoRowLabel}>{Constants.ADDRESS_LBL}</Text>
            <Text>{this.state.mailboxAddress}</Text>
          </View>
          <View style={styles.mailboxInfoRow}>
            <Text style={styles.mailboxInfoRowLabel}>{Constants.ZIP_CODE_LBL}</Text>
            <Text>{this.state.zipCode}</Text>
          </View>
          <View style={styles.mailboxInfoRow}>
            <Text style={styles.mailboxInfoRowLabel}>{Constants.UNIQUE_IDENTIFIER_LBL}</Text>
            <Text>{this.state.observedMailboxId}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>{Constants.UPDATE_SETTINGS_LBL}</Text>
        </View>

        <View style={styles.widgetsContainer}>
          <View style={styles.updateSettingsRow}>
            <Text style={styles.updateInfoRowLabel}>{Constants.DEFAULT_BEHAVIOR_AFTER_LBL}</Text>
            <Picker
              style={styles.pickerComponent}
              selectedValue={this.state.timeToWaitBeforeOpenOrClose}
              onValueChange={(defaultTime) => this.setState({timeToWaitBeforeOpenOrClose: defaultTime})}>
              <Picker.Item label="20 sec" value={20} />
              <Picker.Item label="25 sec" value={25} />
              <Picker.Item label="30 sec" value={30} />
            </Picker>
          </View>
          <View style={styles.updateSettingsRow}>
            <Text style={styles.updateInfoRowLabel}>{Constants.OPEN_BY_DEFAULT_LBL}</Text>
            <Switch 
              style={styles.switchComponent}
              value={this.state.openByDefault} 
              onValueChange = {(value) => {this.setState({openByDefault:value})}}/>
          </View>
        </View>      
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column'
    },
    sectionHeader:{
      flexDirection: 'row', 
      backgroundColor:'#2196F3', 
      padding:10
    },
    sectionHeaderText:{
      fontSize: 20, 
      fontWeight:'bold', 
      color: 'white'
    },
    widgetsContainer:{
      flexDirection: 'column', 
      padding:10
    },
    mailboxInfoRow:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width:'100%',
      height:40
    },
    mailboxInfoRowLabel:{
      fontSize: 16, 
      fontWeight:'bold'
    },
    updateSettingsRow:{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
      width:'100%',
      height:60
    },
    updateInfoRowLabel:{
      fontSize: 16, 
      fontWeight:'bold'
    },
    switchComponent:{
      transform: [{ scaleX: 1.6 }, { scaleY: 1.6 }]
    },
    pickerComponent:{
      width: 100
    }
  });