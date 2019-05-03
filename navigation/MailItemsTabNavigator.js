import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from 'react-navigation';

import AnonymousMailItemsScreen from '../screens/MailItems/Anonymous/AnonymousMailItemsScreen'
import TrustedMailItemsScreen from '../screens/MailItems/Trusted/TrustedMailItemsScreen'

const MailItemsTabNavigator = createMaterialTopTabNavigator({
  Anonymous: AnonymousMailItemsScreen,
  Trusted: TrustedMailItemsScreen,
},
{
    navigationOptions: ({navigation}) => ({
        headerRight: (
            <Ionicons 
                name="md-settings"
                size={32}
                style={{padding: 16}}
                onPress={() => navigation.navigate('MailboxSettings', {mailboxId: navigation.state.params.mailboxId})} />
        )
    })
});

export default MailItemsTabNavigator;