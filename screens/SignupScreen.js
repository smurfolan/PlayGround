import React from 'react';
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';

export default class SignUpScreen extends React.Component{
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>This is SignUp screen</Text>
        </View>
      );
    }
  }