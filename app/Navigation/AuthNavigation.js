import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'


import Login from '../Screens/AuthScreens/Login'
import Register from '../Screens/AuthScreens/Register'
import Splash from '../Screens/AuthScreens/Splash'
import VerificationStepNavigation from './VerificationNavigation'
import SetupStepNavigation from './SetupNavigation'

const AuthStack = createStackNavigator()



export default function AuthNavigation() {
    

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='splash' component={Splash} options={{ headerShown: false }} />
            <AuthStack.Screen name='login' component={Login}  options={{ headerShown: false }} />
            <AuthStack.Screen name='register' component={Register}  options={{ headerShown: false }} />
            <AuthStack.Screen name='verification' component={VerificationStepNavigation}  options={{ headerShown: false }} />
            <AuthStack.Screen name='setup' component={SetupStepNavigation}  options={{ headerShown: false }} />
        </AuthStack.Navigator>
    )
}