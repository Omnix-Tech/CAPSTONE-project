import React from 'react'
import { AuthContext, AppContext } from '../app.context'

import Permission from '../Services/Permissions/location.permission'
import axios from '../api.client'


import DrawerNavigation from './DrawerNavigation'
import TabNavigation from './TabNavigation'
import { createStackNavigator } from '@react-navigation/stack'
import { HStack, IconButton } from 'native-base'
import { Icon } from 'react-native-elements'



const AppRootStack = createStackNavigator()

const DrawerHeader = ({ navigation }) => {
    return (
        <HStack bgColor={'light.100'} width={'full'} alignItems={'center'} paddingTop={35} paddingX={2} >
            <IconButton onPress={ () => navigation.pop() } icon={<Icon type='feather' name='chevron-left' />} />
        </HStack>
    )
}



export default function AppNavigation() {
    const [location, setLocation] = React.useState(null)
    const { user } = React.useContext(AuthContext)
    const appContext = React.useMemo(() => { return { user, location }}, [location])
    

    React.useEffect( async () => {
        const { location: locationPermission } = Permission()
        const currentLocation = await locationPermission().catch(error => alert(error?.message))

        if (currentLocation) {
            const response = await axios()
            .post('/get/location', { currentLocation })
            .catch(error => alert(error?.message))

            if (response) setLocation(response.data)
        }
    }, [])


    return (
        <AppContext.Provider value={appContext}>
            <AppRootStack.Navigator>
                <AppRootStack.Screen name='tabs' component={TabNavigation} options={{ headerShown: false }} />
                <AppRootStack.Screen name='drawer' component={DrawerNavigation} options={{ title: '', header: (props) => <DrawerHeader {...props}/>}} />
            </AppRootStack.Navigator>
        </AppContext.Provider>
    )
}