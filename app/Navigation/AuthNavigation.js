import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'


import Login from '../Screens/AuthScreens/Login'
import Register from '../Screens/AuthScreens/Register'
import Splash from '../Screens/AuthScreens/Splash'


const AuthStack = createStackNavigator()



export default function AuthNavigation() {
    

    return (
        <AuthStack.Navigator>
            <AuthStack.Screen name='splash' component={Splash} />
            <AuthStack.Screen name='login' component={Login} />
            <AuthStack.Screen name='register' component={Register} />
        </AuthStack.Navigator>
    )
}