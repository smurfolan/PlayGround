import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignupScreen'

const AuthenticationStack = createStackNavigator({
    Login: LoginScreen,
    Signup: SignUpScreen
});

export default createAppContainer(AuthenticationStack);