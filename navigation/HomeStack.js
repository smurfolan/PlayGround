import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen'
import MailboxItemsScreen from '../screens/MailboxItemsScreen'
import MailboxItemDetailsScreen from '../screens/MailboxItemDetailsScreen'
import NewMailItemScreen from '../screens/NewMailItemScreen'
import MailboxSettingsScreen from '../screens/MailboxSettingsScreen'

export default createStackNavigator({
    Home: HomeScreen,
    MailboxItems: MailboxItemsScreen,
    MailboxItemDetails : MailboxItemDetailsScreen,
    NewMailItem: NewMailItemScreen,
    MailboxSettings: MailboxSettingsScreen
});