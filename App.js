import React from 'react'
import { LogBox } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'



import { AuthContext } from './app/app.context'
import { NativeBaseProvider } from 'native-base'


import AuthNavigation from './app/Navigation/AuthNavigation'
import AppNavigation from './app/Navigation/AppNavigation'

import * as Authenticate from './app/Services/Auth/Authentication'

import { Text } from 'native-base'


LogBox.ignoreAllLogs(true)


const RootStack = createStackNavigator()
const RootStackNavigator = ({ user }) => (
  <RootStack.Navigator>
    {user ? (
      <RootStack.Screen name='app' component={AppNavigation} initialParams={{ user }} options={{ headerShown: false }} />
    ) : (
      <RootStack.Screen name='auth' component={AuthNavigation} options={{ headerShown: false }} />
    )}
  </RootStack.Navigator>
)



export default () => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [user, setUser] = React.useState({})
  const authContext = React.useMemo(() => {
    return {
      signIn: async (email, password) => {
        const user = await Authenticate.signIn(email, password)
          .catch(err => {
            throw err
          })

        setUser(user)
      },
      logOut: async () => {
        await Authenticate.logout()
        setUser(null)
      }
    }
  }, [])


  React.useEffect(() => {
    // setUser(Authenticate.auth.currentUser)
    setIsLoading(false)
  }, [user])


  return (
    <AuthContext.Provider value={authContext}>
      <NativeBaseProvider>
        {isLoading ? (
          <Text>loading...</Text>
        ) : (
          <NavigationContainer>
            <RootStackNavigator user={user} />
          </NavigationContainer>
        )}
      </NativeBaseProvider>
    </AuthContext.Provider>
  )
}