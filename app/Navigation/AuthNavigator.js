import React from 'react'
import Landing from '../Screens/Landing'
import Login from '../Screens/Login'
import Register from '../Screens/Register'
import { createStackNavigator } from '@react-navigation/stack'


const AuthStack = createStackNavigator()


export default function AuthNavigator() {
    return (
        <AuthStack.Navigator headerMode='none'>
            <AuthStack.Screen name="Landing" component={Landing} />
            <AuthStack.Screen name='Login' component={Login} />
            <AuthStack.Screen name='Register' component={Register} />
        </AuthStack.Navigator>
    )
}