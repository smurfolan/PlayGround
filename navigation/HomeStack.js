import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import NewMailItemScreen from '../screens/NewMailItemScreen'
import MailboxSettingsScreen from '../screens/MailboxSettingsScreen'
import AnonymousMailItemDetailsScreen from '../screens/MailItems/Anonymous/AnonymousMailItemDetailsScreen'
import TrustedMailItemDetailsScreen from '../screens/MailItems/Trusted/TrustedMailItemDetailsScreen'

import MailItemsTabNavigator from './MailItemsTabNavigator'

export default createStackNavigator({
    Home: HomeScreen,
    MailboxItems: MailItemsTabNavigator,
    NewMailItem: NewMailItemScreen,
    MailboxSettings: MailboxSettingsScreen,
    AnonymousMailItemDetails: AnonymousMailItemDetailsScreen,
    TrustedMailItemDetails: TrustedMailItemDetailsScreen
});