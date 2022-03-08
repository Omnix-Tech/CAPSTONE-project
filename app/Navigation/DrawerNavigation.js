import React from 'react'

import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'


import { Button, VStack, Box, HStack, Avatar, Heading, IconButton, Text, ScrollView } from 'native-base'
import { AuthContext } from '../app.context'
import { Container } from '../Components/components'
import { Icon } from 'react-native-elements'

const BoxDom = () => <Box></Box>


const Drawer = createStackNavigator()
const DrawerContainer = ({ navigation }) => {
    const { logOut } = React.useContext(AuthContext)
    const [notifications, setNotifications] = React.useState([])
    return (
        <Box height={'full'}>
            <VStack space={5} marginY={15} justifyContent={'center'} alignItems={'center'}>
                <Avatar />
                <Heading>Joel Henry</Heading>
                <Button variant={'ghost'}>Profile</Button>
            </VStack>
            <Heading marginX={3} size={'md'} >Notifications</Heading>
            <ScrollView>
                
                <Container height={'70%'} >
                    
                    {notifications.length === 0 ? (
                        <VStack justifyContent={'center'} alignItems={'center'} height={40} paddingTop={30}>
                            <Text color={'muted.400'} bold >No Notifications</Text>
                        </VStack>) : (
                        <>{notifications.map((notification, key) => {
                            return (<Box height={70} key={key}>{notification}</Box>)
                        })}</>
                    )}

                </Container>
            </ScrollView>
            <HStack bgColor={'light.200'} justifyContent={'space-between'} paddingX={5} paddingY={3}>
                <IconButton onPress={() => logOut()} icon={<Icon type='feather' name='log-out' />} />
                <IconButton onPress={() => navigation.navigate('accountStack')} icon={<Icon type='feather' name='settings' />} />
            </HStack>
        </Box>
    )
}

const AccountStack = createStackNavigator()
const AccountStackNavigator = () => {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen component={BoxDom} name={'account'} />
        </AccountStack.Navigator>
    )
}


const ProfileStack = createStackNavigator()
const ProfileStackNavigator = () => {
    return (
        <ProfileStack.Navigator>
            <ProfileStack.Screen component={BoxDom} name={'profile'} />
        </ProfileStack.Navigator>
    )
}


export default function DrawerNavigation() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name='drawer' component={DrawerContainer} options={{ headerShown: false }} />
            <Drawer.Screen name='accountStack' component={AccountStackNavigator} />
            <Drawer.Screen name='profileStack' component={ProfileStackNavigator} />
        </Drawer.Navigator>
    )
}