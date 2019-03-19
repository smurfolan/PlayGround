import React from "react";
import NotificationService from '../services/NotificationService';
import { Notifications } from 'expo';
import firebase from 'firebase';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import Constants from '../constants/Constants'

export default class HomeScreen extends React.Component {
  static navigationOptions = () => {
    return {
      title: Constants.MAILBOXES_LBL,
      headerStyle: {
        backgroundColor: '#C173E8',
      },
      headerTintColor: '#fff'
    };
  };

  constructor(){
    super()
    this.state = {
        dataSource: [],
        isLoading: true
    }
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity style={styles.touchableContent}
          onPress = {() => this.props.navigation.navigate('MailboxItems', {
            mailboxId: item.mailboxId
          })}>
          <Image style={styles.touchableContentImage}
          source={require('../content/images/mailbox_Icon.png')}
          />
          <View style={styles.touchableContentMainText}>
              <Text style={{ fontSize: 16, color: 'green' }}>
                  {item.city}, {item.zipCode}
              </Text>
              <Text style={{ fontSize: 13, marginBottom: 15 }}>
                  {item.address}
              </Text>
          </View>
          <View style={styles.touchableContentNumberOfMailItems}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                  ({item.numberOfMailItems})
              </Text>
          </View>
      </TouchableOpacity>
    )
}

renderSeparator = () => {
  return (
      <View
          style={{height: 1, width: '100%', backgroundColor: 'black'}}>
      </View>
  )
}

componentDidMount(){
  this._notificationSubscription = 
    Notifications.addListener((notification) => {
        NotificationService.handleNotification(notification, this.props.navigation)    
    });
    this.props.navigation.addListener('willFocus', this.fetchMyMailboxes)
}

fetchMyMailboxes = () => {
  fetch(Constants.FUNCTIONS_URL.GET_MY_MAILBOXES + firebase.auth().currentUser.uid)
  .then((response) => response.json())
  .then((responseJson) => {
    this.setState({
        dataSource: responseJson,
        isLoading: false
    })
  })
  .catch((error) => {
    console.log(error)
  })
}

componentWillUnmount(){
    this._notificationSubscription.remove();
}

render(){
  return (
    this.state.isLoading
    ?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="green" animating />
    </View>
    :
    <View style={styles.container}>
      <FlatList style={{marginTop: 30}}
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.mailboxId}
          ItemSeparatorComponent={this.renderSeparator}
      />
    </View>
  )
}
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F5FCFF'
  },
  touchableContent: {
      flex: 1, 
      flexDirection: 'row', 
      marginBottom: 3
  },
  touchableContentImage: {
      width: 40, 
      height: 40, 
      margin: 5
  },
  touchableContentMainText: {
      flex: 1, 
      justifyContent: 'center'
  },
  touchableContentNumberOfMailItems:{
      justifyContent: 'flex-end',
      justifyContent: 'center',
      marginRight: 10
  }
});