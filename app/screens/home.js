import { Box, Text, IconButton, HStack, Stack, Heading, Button, Pressable, ScrollView, Image } from 'native-base'
import { ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements'


import React from 'react'


import { Container } from '../Components/components'
import { UserContext } from '../app.context'



export default function Home({ navigation }) {
    const { user, location } = React.useContext(UserContext)
    return (
        <Box>
            <ImageBackground style={{ width: '100%' }} source={{ uri: 'https://images.unsplash.com/photo-1643068485255-15bb6c3727da?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=869&q=80' }}>
                <Box height={200} width='full' bgColor={'rgba(0, 0, 0, 0.7)'}>
                    <HStack justifyContent={'space-between'} padding={1.5}>
                        <IconButton icon={<Icon type='feather' name='menu' color='white' />} />
                        <IconButton onPress={() => navigation.navigate('profile')} icon={<Icon type='feather' name='user' color='white' />} />
                    </HStack>

                    <Stack paddingY={6} paddingX={10} >

                        <Heading color={'white'}>Hi, { user ? user.displayName ? user.displayName : 'No Name' : 'No User' } </Heading>

                        <HStack space={1} alignItems={'center'} marginTop={0.5}>
                            <Icon type='feather' name='map-pin' color='#22c55e' size={14} />
                            <Text color={'white'} >{ location ? location.area : 'No Location' } Connect</Text>
                        </HStack>

                    </Stack>
                </Box>
            </ImageBackground>

            <Container>
            <Heading>Home</Heading>
            <Button onPress={() => navigation.navigate('forum') } >Forum</Button>
            <Button onPress={() => navigation.navigate('forums') } >Forum List</Button>
            <Button onPress={() => navigation.navigate('alertStack') } >Alert List</Button>
            <Button onPress={() => navigation.navigate('alertComp') } >Alert</Button>
            <Button onPress={() => navigation.navigate('searchStack') } >Search</Button>
        </Container>
        </Box>
        

    )
}