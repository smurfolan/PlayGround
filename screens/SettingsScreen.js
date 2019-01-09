import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';

export default class SettingsScreen extends React.Component{
  static navigationOptions = () => {
    return {
      title: 'Settings',
      headerStyle: {
        backgroundColor: '#1D9ED7'
      },
      headerTintColor: '#fff'
    };
  };

  constructor(props) {
    super(props);
  }

  markUserAsLoggedOut = async () => {
    let token = await Notifications.getExpoPushTokenAsync();
    // Just mark the crrrently logged in user as logged out
    firebase.database().ref('DeviceLogins')
    .orderByChild('deviceExpoToken')
    .equalTo(token)
    .once('value', function (snapshot) {
      snapshot.forEach(function(child) {
        // We assume that at certain moment only a single user can be logged in
        // on a certain device. So for the specific token, there must be always
        // a single user with a status of loggedIn = true.
        if(child.val().isLoggedIn == true){
          child.ref.update({isLoggedIn: false});
        }
      })
    })
  }

  signOutUser = () => {
    firebase.auth().signOut().then(data => {
      this.markUserAsLoggedOut();
    }, function(error) {
          console.error('Sign Out Error', error);
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>This is the SETTINGS tab.</Text>
        <Button title="Log out" onPress={() => this.signOutUser()} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
  }
});