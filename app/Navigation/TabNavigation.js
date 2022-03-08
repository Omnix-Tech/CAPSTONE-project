import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'

// import { PostStack } from '../Components/elements'
import Home from '../Screens/Home'
import Forum from '../Screens/Forum'

import { Box, HStack, IconButton } from 'native-base'


const BoxDom = () => <Box>Placeholder</Box>

const AppHeader = ({ navigation }) => {
    return (
        <HStack justifyContent={'space-between'} bgColor={'light.100'} width={'full'} alignItems={'center'} paddingTop={35} paddingX={2} >
            <IconButton onPress={ () => navigation.navigate('drawer') } icon={<Icon type='feather' name='menu' />} />
        </HStack>
    )
}

const BackHeader = ({ navigation }) => {
    return (
        <HStack bgColor={'light.100'} width={'full'} alignItems={'center'} paddingTop={35} paddingX={2} >
            <IconButton onPress={ () => navigation.pop() } icon={<Icon type='feather' name='chevron-left' />} />
        </HStack>
    )
}

const HomeStack = createStackNavigator()
const HomeStackNavigator = () => (
    <HomeStack.Navigator >
        <HomeStack.Screen name='home' component={Home} options={{ title: '', header: (props) => <AppHeader {...props}/> }} />
        <HomeStack.Screen name='forum' component={Forum} options={{ title: '', header: (props) => <BackHeader {...props}/> }} />
        <HomeStack.Screen name='forums' component={BoxDom} options={{ title: '', header: (props) => <BackHeader {...props}/> }} />
        <HomeStack.Screen name='alertComp' component={BoxDom} options={{ title: '', header: (props) => <BackHeader {...props}/> }} />
    </HomeStack.Navigator>
)


const SearchStack = createStackNavigator()
const SearchStackNavigator = () => (
    <SearchStack.Navigator>
        <SearchStack.Screen name='search' component={BoxDom} options={{ title: '', header: (props) => <AppHeader {...props}/> }} />
        <SearchStack.Screen name='results' component={BoxDom} options={{ title: '', header: (props) => <BackHeader {...props}/> }} />
    </SearchStack.Navigator>
)


const ConnectStack = createStackNavigator()
const ConnectStackNavigator = () => (
    <ConnectStack.Navigator>
        <ConnectStack.Screen name='connect' component={BoxDom} options={{ title: '', header: (props) => <AppHeader {...props}/> }} />
    </ConnectStack.Navigator>
)



const AlertStack = createStackNavigator()
const AlertStackNavigator = () => (
    <AlertStack.Navigator>
        <AlertStack.Screen name='alerts' component={BoxDom} options={{ title: '', header: (props) => <AppHeader {...props}/> }} />
        <AlertStack.Screen name='alert' component={BoxDom} options={{ title: '', header: (props) => <BackHeader {...props}/> }} />
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


export default function TabNavigation() {

    return (
        <Tabs.Navigator screenOptions={screenOptions}>
            <Tabs.Screen name='homeStack' component={HomeStackNavigator} options={tabOptions('home')} />
            <Tabs.Screen name='searchStack' component={SearchStackNavigator} options={tabOptions('search')} />
            {/* <Tabs.Screen name='postStack' component={Box} options={{
                    tabBarButton: (props) => (<PostStack {...props} />)
                }} /> */}
            <Tabs.Screen name='alertStack' component={AlertStackNavigator} options={tabOptions('hexagon')} />
            <Tabs.Screen name='connectStack' component={ConnectStackNavigator} options={tabOptions('map-pin')} />
        </Tabs.Navigator>
    )
}