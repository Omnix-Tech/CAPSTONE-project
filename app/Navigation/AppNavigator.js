import React from 'react'


import Home from '../screens/Home'
import Profile from '../Screens/Profile'
import Alerts from '../Screens/Alerts'
import Search from '../Screens/Search'

import { Icon } from 'react-native-elements'
import { Box, useDisclose, Stagger, IconButton, HStack } from 'native-base'



import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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




function PostButtonActive() {
    return <></>
}


function NewMenuButton() {
    const { isOpen, onToggle } = useDisclose()
    const boxStyle = {
        position: 'absolute',
        bottom: 78,
        right: 2,


    }
    return (
        <Box {... boxStyle}>
        <Stagger visible={isOpen} initial={{
                opacity: 0,
                scale: 0,
                translateY: 34
            }} animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,

                transition: {
                    type: "spring",
                    mass: 0.8,
                    stagger: {
                        offset: 30,
                        reverse: true
                    }
                }
            }} exit={{
                translateY: 34,
                scale: 0.5,
                opacity: 0,
                transition: {
                    duration: 100,
                    stagger: {
                        offset: 30,
                        reverse: true
                    }
                }
            }}>
                <IconButton mb={5} variant='ghost' colorScheme='info.200' borderRadius={'full'} icon={<Icon type='feather' name='plus' />} />
                <IconButton mb={5} variant='ghost' colorScheme='info.200' borderRadius={'full'} icon={<Icon type='feather' name='message-circle' />} />
            </Stagger>

            <HStack alignItems={'center'}>
                <IconButton variant={'solid'} borderRadius='full' size={'lg'} onPress={onToggle} bg='info.800' color={'white'} icon={<Icon type='feather' name='more-vertical' color={'white'} />} />
            </HStack>
        </Box>
            
    )
}



export default function AppNavigator() {
    const activeColor = '#06b6d4'
    const inActiveColor = '#dbf4ff'


    return (
        <>

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

                <Tabs.Screen name='post' component={PostButtonActive} options={{
                    tabBarButton: (props) => (<NewMenuButton {... props} />)
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
        </>

    )
}