import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

import { UserContext } from '../app.context'

// import { PostStack } from '../Components/elements'
import Home from '../Screens/Home'

import Permission from '../Services/Permissions/location.permission'
import axios from '../api.client'


const BoxDom = () => <></>


const HomeStack = createStackNavigator()
const HomeStackNavigator = () => (
    <HomeStack.Navigator >
        <HomeStack.Screen name='home' component={Home} options={{headerShown: false}}/>
        <HomeStack.Screen name='forum' component={BoxDom} options={{headerShown: false}}/>
        <HomeStack.Screen name='forums' component={BoxDom} options={{headerShown: false}}/>
        <HomeStack.Screen name='alertComp' component={BoxDom} options={{headerShown: false}}/>
    </HomeStack.Navigator>
)


const SearchStack = createStackNavigator()
const SearchStackNavigator = () => (
    <SearchStack.Navigator>
        <SearchStack.Screen name='search' component={BoxDom} options={{headerShown: false}}/>
        <SearchStack.Screen name='results' component={BoxDom} options={{headerShown: false}}/>
    </SearchStack.Navigator>
)


const ProfileStack = createStackNavigator()
const ProfileStackNavigator = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen name='profile' component={BoxDom} options={{headerShown: false}}/>
    </ProfileStack.Navigator>
)


const NotificationStack = createStackNavigator()
const NotificationStackNavigator = () => (
    <NotificationStack.Navigator>
        <NotificationStack.Screen name='notification' component={BoxDom} options={{headerShown: false}}/>
    </NotificationStack.Navigator>
)



const AlertStack = createStackNavigator()
const AlertStackNavigator = () => (
    <AlertStack.Navigator>
        <AlertStack.Screen name='alerts' component={BoxDom} options={{headerShown: false}}/>
        <AlertStack.Screen name='alert' component={BoxDom} options={{headerShown: false}}/>
    </AlertStack.Navigator>
)


const Tabs = createBottomTabNavigator()
const screenOptions = {
    labeled: false,
    tabBarStyle: {
        height: 60,
        backgroundColor: '#164e63',
        position: 'absolute',
        bottom: 5,
        right: 5,
        left: 5,
        borderRadius: 8
    }
}

const tabOptions = (icon) => {
    const activeColor = '#06b6d4'
    const inActiveColor = '#dbf4ff'
    return {
        tabBarLabel: () => null,
        headerShown: false,
        tabBarIcon: ({ focused }) => (<Icon color={focused ? activeColor : inActiveColor} type='feather' name={icon} />)
    }
}




export default function AppNavigation({ route }) {
    const [location, setLocation] = React.useState(null)
    const userContext = React.useMemo(() => { return { user: route.params?.user, location }}, [location])
    

    React.useEffect( async () => {
        const { location: locationPermission } = Permission()
        const currentLocation = await locationPermission().catch(error => alert(error?.message))

        if (currentLocation) {
            const response = await axios()
            .post('/get/location', { currentLocation })
            .catch(error => console.log(error?.message))

            if (response) setLocation(response.data)
        }
    }, [])

    return (
        <UserContext.Provider value={userContext}>
            <Tabs.Navigator screenOptions={screenOptions}>
                <Tabs.Screen name='homeStack' component={HomeStackNavigator} options={tabOptions('home')} />
                <Tabs.Screen name='searchStack' component={SearchStackNavigator} options={tabOptions('search')} />
                {/* <Tabs.Screen name='postStack' component={Box} options={{
                    tabBarButton: (props) => (<PostStack {...props} />)
                }} /> */}
                <Tabs.Screen name='alertStack' component={AlertStackNavigator} options={tabOptions('hexagon')}/>
                <Tabs.Screen name='notificationStack' component={NotificationStackNavigator} options={tabOptions('bell')} />
            </Tabs.Navigator>
        </UserContext.Provider>
    )
}