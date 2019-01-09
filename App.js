import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import TabNavigator from './navigation/AppNavigator'
import AuthenticationStack from './navigation/AuthenticationStack'

import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDdW0WLhoJZyqNIOh5ha-CkrD1cEBIIMso",
    authDomain: "peepnee-backend.firebaseapp.com",
    databaseURL: "https://peepnee-backend.firebaseio.com",
    projectId: "peepnee-backend",
    storageBucket: "peepnee-backend.appspot.com",
    messagingSenderId: "614958212773"
}

firebase.initializeApp(firebaseConfig);

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      userIsLoggedIn: null
    };
  }

  componentDidMount(){
    firebase.auth().onAuthStateChanged(user => {
      let userLoggedIn = (user != null) ? true : false;
      this.setState({userIsLoggedIn: userLoggedIn});
    });
  }

  render() {
    if(this.state.userIsLoggedIn != null){
      if(this.state.userIsLoggedIn){
        return (
          <TabNavigator />
        );
      }
      else{
        return (
          <AuthenticationStack />
        );
      }
    }
    else{
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color='#ff0000' />
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    flex: 1
  }
});
