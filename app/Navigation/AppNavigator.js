import React from 'react'


import Home from '../Screens/Home'
import Profile from '../Screens/Profile'
import Alerts from '../Screens/Alerts'
import Search from '../Screens/Search'

import { Icon } from 'react-native-elements'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// import { createDrawerNavigator } from '@react-navigation/drawer'
import NewMenuButton from '../components/elements/NewMenuButton'


import { UserContext, AuthContext } from '../Auth/context'

import Permissions from '../utils/Permissions'
import apiClient from '../utils/apiClient'


const Tabs = createBottomTabNavigator()


const HomeStack = createStackNavigator()
const HomeStackScreen = () => (
    <HomeStack.Navigator headerMode='none'>
        <HomeStack.Screen name="home" component={Home} />
    </HomeStack.Navigator>
)


const SearchStack = createStackNavigator()
const SearchStackScreen = () => (
    <SearchStack.Navigator headerMode='none'>
        <SearchStack.Screen name='search' component={Search} />
    </SearchStack.Navigator>
)


const ProfileStack = createStackNavigator()
const ProfileStackScreen = () => (
    <ProfileStack.Navigator headerMode='none'>
        <ProfileStack.Screen name='profile' component={Profile} />
    </ProfileStack.Navigator>
)


const AlertsStack = createStackNavigator()
const AlertsStackScreen = () => (
    <AlertsStack.Navigator headerMode='none'>
        <AlertsStack.Screen name='alerts' component={Alerts} />
    </AlertsStack.Navigator>
)

// const DrawerStack = createDrawerNavigator()
// const DrawerMenu = () => (
//     <DrawerStack.Navigator>
//         <DrawerStack.Screen name='Settings' component={Box} />
//     </DrawerStack.Navigator>
// )

export default function AppNavigator({ route }) {
    const activeColor = '#06b6d4'
    const inActiveColor = '#dbf4ff'

    const [location, setLocation] = React.useState(null)

    const userContext = React.useMemo(() => {
        return { user: route.params?.user, location }
    }, [location])

    const { location: locationPermission } = Permissions()

    React.useEffect(async () => {
        const currentLocation = await locationPermission().catch(error => alert(error.message))
        if (currentLocation) {
            const response = await apiClient()
                .post('/get/location', {
                    currentLocation
                })
                .catch(error => console.log(error))

            const location = response.data
            setLocation(location)
        }
    }, [])


    return (
        <UserContext.Provider value={userContext}>
            <Tabs.Navigator screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    height: 60,
                    backgroundColor: '#002851',
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    left: 10,
                    borderRadius: 20
                }
            }}>
                <Tabs.Screen name="home" component={HomeStackScreen} options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (<Icon color={focused ? activeColor : inActiveColor} type='feather' name='home' />)
                }} />

                <Tabs.Screen name="search" component={SearchStackScreen} options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (<Icon color={focused ? activeColor : inActiveColor} type='feather' name='search' />)
                }} />

                <Tabs.Screen name='post' component={NewMenuButton} options={{
                    tabBarButton: (props) => (<NewMenuButton {...props} />)
                }} />

                <Tabs.Screen name="alerts" component={AlertsStackScreen} options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (<Icon color={focused ? activeColor : inActiveColor} type='feather' name='hexagon' />)
                }} />


                <Tabs.Screen name="profile" component={ProfileStackScreen} options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused }) => (<Icon color={focused ? activeColor : inActiveColor} type='feather' name='bell' />)
                }} />

            </Tabs.Navigator>
            {/* <DrawerMenu/> */}
        </UserContext.Provider>
    )
}