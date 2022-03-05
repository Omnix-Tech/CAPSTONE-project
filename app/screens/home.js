import { Container, Box, Text, IconButton, HStack, Stack, Heading, Pressable, ScrollView } from 'native-base'

import React from 'react'
import { Icon } from 'react-native-elements'
import { UserContext } from '../Auth/context'

export default function Home({ navigation }) {

    const { user, location } = React.useContext(UserContext)
    const stylePressable = {
        padding: 5,
        height: 70,
        bg: 'lightBlue.700',
        borderRadius: 15
    }



    return (
        <Container>
            <ScrollView>
                <Box height='200' width='100vw' bgImage={'https://images.unsplash.com/photo-1646237355337-c6fe828db242?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'} bg={'info.900'}>
                    <HStack justifyContent={'space-between'} padding={'1.5'}>
                        <IconButton icon={<Icon type='feather' name='menu' color='white' />} />
                        <IconButton icon={<Icon type='feather' name='user' color='white' />} />
                    </HStack>

                    <Stack paddingY={'6'} paddingX={'10'} >

                        <Heading color={'info.100'}>Hi, {user?.displayName} </Heading>

                        <HStack alignItems={'center'} marginTop='0.5'>
                            <Icon style={{ marginRight: 5 }} type='feather' name='map-pin' color='#22c55e' size={'sm'} />
                            <Text color={'info.200'} >{`${location?.area ? location.area : '...'} Connect`}</Text>
                        </HStack>

                    </Stack>
                </Box>

                <Box width={'full'}>
                    <HStack padding={2} width={'100vw'} justifyContent={'space-between'}>
                        <Box padding={2} width={'1/2'}>
                            <Pressable {...stylePressable} onPress={() => alert("Public Forum")}>
                                <Heading color={'white'} size={'sm'} >Public Forum</Heading>
                            </Pressable>
                        </Box>

                        <Box padding={2} width={'1/2'}>
                            <Pressable {...stylePressable} onPress={() => alert("Alerts")}>
                                <Heading color={'white'} size={'sm'} >Alerts</Heading>
                            </Pressable>
                        </Box>
                    </HStack>
                </Box>
            </ScrollView>
        </Container>
    )
}


const styles = {
    container: {
        backgroundColor: "#d954d7",
        height: 200
    }
}