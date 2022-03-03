
import React from 'react';
import AuthNavigator from './app/Navigation/AuthNavigator';
import AppNavigator from './app/Navigation/AppNavigator';
import { AuthContext } from './app/Auth/context';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { createStackNavigator } from '@react-navigation/stack';
import Splash from './app/screens/Splash';




const RootStack = createStackNavigator()
const RootStackScreen = ({ userToken }) => (
    <RootStack.Navigator headerMode='none'>
        {userToken ? (
            <RootStack.Screen name='app' component={AppNavigator} />
        ) : (
            <RootStack.Screen name='auth' component={AuthNavigator} />
        )}
    </RootStack.Navigator>
)


export default () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [userToken, setUserToken] = React.useState('null')

    const authContext = React.useMemo(() => {
        return {
            signIn: () => {
                setIsLoading(true)
                setUserToken("Banana")
            },
            register: () => {
                setIsLoading(true),
                    setUserToken("Band")
            },
            signOut: () => {
                setIsLoading(true),
                    setUserToken(null)
            }
        }
    }, [])

    React.useEffect(() => {
        setTimeout(() => setIsLoading(false), 3000)
    }, [userToken])



    return (
        <AuthContext.Provider value={authContext}>
            <NativeBaseProvider>
                {isLoading ? (
                    <Splash />
                ) : (
                    <NavigationContainer>
                        <RootStackScreen userToken={userToken} />
                    </NavigationContainer>
                )}

            </NativeBaseProvider>
        </AuthContext.Provider>

    )
}



