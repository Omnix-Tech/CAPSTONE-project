
import React from 'react';
import AuthNavigator from './app/Navigation/AuthNavigator';
import AppNavigator from './app/Navigation/AppNavigator';
import { AuthContext } from './app/Auth/context';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './app/Screens/Splash';

import * as Authenticate from './app/Auth/Authentication'




const RootStack = createStackNavigator()
const RootStackScreen = ({ user }) => (
    <RootStack.Navigator headerMode='none'>
        {user ? (
            <RootStack.Screen name='app' component={AppNavigator} initialParams={{ user }} />
        ) : (
            <RootStack.Screen name='auth' component={AuthNavigator} />
        )}
    </RootStack.Navigator>
)


export default () => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [user, setUser] = React.useState(null)

    const authContext = React.useMemo(() => {
        return {

            signIn: (email, password) => {
                setIsLoading(true)
                Authenticate.signIn(email, password)
                    .then(user => {
                        setUser(user)
                        setIsLoading(false)
                    })
                    .catch(err => {
                        alert(err.message)
                        setIsLoading(false)
                    })
            },

            register: (firstName, lastName, email, password) => {
                // setIsLoading(true),
                Authenticate.register(firstName, lastName, email, password)
                    .then(credential => console.log(credential))
                    .catch(err => alert(err.message))
            },

            signOut: () => {
                Authenticate.logout()
                setUser(null)
            }
        }
    }, [])

    React.useEffect(() => {
        setUser(Authenticate.auth.currentUser)
        setIsLoading(false)
    }, [user])



    return (
        <AuthContext.Provider value={authContext}>
            <NativeBaseProvider>
                {isLoading ? (
                    <Splash />
                ) : (
                    <NavigationContainer>
                        <RootStackScreen user={user} />
                    </NavigationContainer>
                )}

            </NativeBaseProvider>
        </AuthContext.Provider>

    )
}



