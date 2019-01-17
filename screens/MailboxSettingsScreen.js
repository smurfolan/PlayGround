import React from 'react';
import { Text, View, Button, StyleSheet, Switch, Picker } from 'react-native';

// This peace of code is not a good practice (Descr. here https://github.com/react-navigation/react-navigation/issues/1468).
// We need to avoid it and take a better approach of calling component funcs inside of navigation. 
let _this = null;

export default class SettingsScreen extends React.Component{
  static navigationOptions = () => {
    return {
      headerStyle: {
        backgroundColor: '#C173E8'
      },
      headerTintColor: '#fff',
      headerRight: (
        <Button style={{marginRight:20}} color="#2196F3"
          onPress={() => _this._saveDefaultBoxSettings()}
          title="Save"
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
        openByDefault: false,
        timeToWaitBeforeOpenOrClose: null,
        zipCode: null
      };
  }

  _saveDefaultBoxSettings(){
    alert("Mailbox Id:" 
        + this.state.observedMailboxId 
        + ", Seconds to wait:" 
        + parseInt(this.state.timeToWaitBeforeOpenOrClose)
        + ", default behavior:" 
        + this.state.openByDefault)
  }

  componentDidMount(){
    _this = this;
    const url = 'https://us-central1-peepnee-backend.cloudfunctions.net/getMailboxSettings?mailboxId='
                + this.state.observedMailboxId
  
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        mailboxAddress: responseJson.address,
        mailboxCity: responseJson.city,
        numberOfMailItems: parseInt(responseJson.numberOfMailItems),
        openByDefault: responseJson.openByDefault === true,
        timeToWaitBeforeOpenOrClose: parseInt(responseJson.timeToWaitBeforeOpenOrClose),
        zipCode: parseInt(responseJson.zipCode)
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}><Text style={styles.sectionHeaderText}>Mailbox info</Text>
        </View>

        <View style={styles.widgetsContainer}>
          <View style={styles.mailboxInfoRow}>
            <Text style={styles.mailboxInfoRowLabel}>City</Text><Text>{this.state.mailboxCity}</Text>
          </View>
          <View style={styles.mailboxInfoRow}>
            <Text style={styles.mailboxInfoRowLabel}>Address</Text><Text>{this.state.mailboxAddress}</Text>
          </View>
          <View style={styles.mailboxInfoRow}>
            <Text style={styles.mailboxInfoRowLabel}>Zip Code</Text><Text>{this.state.zipCode}</Text>
          </View>
          <View style={styles.mailboxInfoRow}>
            <Text style={styles.mailboxInfoRowLabel}>Unique identifier</Text><Text>{this.state.observedMailboxId}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Update settings</Text>
        </View>

        <View style={styles.widgetsContainer}>
          <View style={styles.updateSettingsRow}>
            <Text style={styles.updateInfoRowLabel}>Default behavior after</Text>
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
            <Text style={styles.updateInfoRowLabel}>Open by default</Text>
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