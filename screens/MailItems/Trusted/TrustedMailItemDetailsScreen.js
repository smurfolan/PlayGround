import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from '../../../constants/Constants'

export default class TrustedMailItemDetailsScreen extends React.Component{
  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: { backgroundColor: '#C173E8' },
      headerTintColor: '#fff',
    };
  };

  constructor(props) {
    super(props);
    this.state = { 
        mailItemId: props.navigation.state.params.mailItemId,
        company: props.navigation.state.params.company,
        person: props.navigation.state.params.person,
        personContactInfo: props.navigation.state.params.personContactInfo,
        mailReceivedAt: props.navigation.state.params.receivedAt,
      };
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}><Text style={styles.sectionHeaderText}>{Constants.MAILBOX_ITEM_DETAILS}</Text>
        </View>

        <View style={styles.widgetsContainer}>
          <View style={styles.mailItemInfoRow}>
            <Text style={styles.mailItemInfoRowLabel}>{Constants.COMPANY_LBL}</Text>
            <Text>{this.state.company}</Text>
          </View>
          <View style={styles.mailItemInfoRow}>
            <Text style={styles.mailItemInfoRowLabel}>{Constants.DELIVERY_PERSON_LBL}</Text>
            <Text>{this.state.person}</Text>
          </View>
          <View style={styles.mailItemInfoRow}>
            <Text style={styles.mailItemInfoRowLabel}>{Constants.CONTACT_LBL}</Text>
            <Text>{this.state.personContactInfo}</Text>
          </View>
          <View style={styles.mailItemInfoRow}>
            <Text style={styles.mailItemInfoRowLabel}>{Constants.RECEIVED_AT_LBL}</Text>
            <Text>{this.state.mailReceivedAt}</Text>
          </View>
          <View style={styles.mailItemInfoRow}>
            <Text style={styles.mailItemInfoRowLabel}>{Constants.REF_ID_LBL}</Text>
            <Text>{this.state.mailItemId}</Text>
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
    mailItemInfoRow:{
      flexDirection: 'row',
      justifyContent: 'space-between',
      width:'100%',
      height:40
    },
    mailItemInfoRowLabel:{
      fontSize: 16, 
      fontWeight:'bold'
    },
  });