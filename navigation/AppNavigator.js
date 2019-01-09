import React from 'react';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons'

import HomeStack from './HomeStack'
import SettingsStack from './SettingsStack'

const TabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarIcon:({tintColor})=>(
              <Icon name="ios-home" color={tintColor} size={24}/>
            )
        }
      },
    Settings: {
        screen: SettingsStack,
        navigationOptions: {
            tabBarIcon:({tintColor})=>(
              <Icon name="ios-settings" color={tintColor} size={24}/>
            )
        }
      }
});

export default createAppContainer(TabNavigator);