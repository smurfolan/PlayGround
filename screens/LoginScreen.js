import React from 'react';
import { StyleSheet, Text } from "react-native";
import { Container, Form, Input, Item, Button, Label } from 'native-base'
import firebase from 'firebase';

import NotificationService from '../services/NotificationService';

export default class LoginScreen extends React.Component{
  static navigationOptions = {
    header: null,
  };
  
  constructor(props){
    super(props)

    this.state = ({
      email: '',
      password: ''
    })
  }

  signUpUser = (email, password) => {
    try{
      if(this.state.password.length < 6){
        alert("Please enter at least 6 characters")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(authResponse){
          firebase.database().ref('Users').child(authResponse.user.uid).set({
            email: authResponse.user.email,
            createdAt: authResponse.user.metadata.creationTime
          }).then(()=>{
            //success callback
          }).catch(()=>{
            //error callback
          })
        }).catch(function() {
          //Handle error
        });
    }
    catch(error){
      console.log(error.toString())
    }
  }

  loginUser = (email, password) => {
    try{
      firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
        NotificationService.registerForPushNotificationsAsync(user);
      })
    }
    catch(error){
      console.log(error.toString())
    }
  }

  render() {
    return (
      <Container style={styles.container}>
      <Form>
        <Item floatingLabel>
          <Label>Email</Label>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(email)=>this.setState({email})}
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input
            secureTextEntry={true}
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={(password)=>this.setState({password})}
          />
        </Item>
        <Button style={{marginTop: 10}}
          full
          rounded
          success
          onPress={()=>this.loginUser(this.state.email, this.state.password)}
        >
          <Text style={styles.inputButtonsText}>Login</Text>
        </Button>
        <Button style={{marginTop: 10}}
          full
          rounded
          primary
          onPress={()=>this.signUpUser(this.state.email, this.state.password)}
        >
          <Text style={styles.inputButtonsText}>Sign up</Text>
        </Button>
      </Form>
    </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding:10
  },
  inputButtonsText:{
    color:'white'
  }
});