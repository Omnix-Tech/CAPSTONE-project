import { Box, Text, IconButton, HStack, Stack, Heading, Button, Pressable, ScrollView, Image } from 'native-base'
import { ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel'


import React from 'react'


import { Container, PressableContainer } from '../Components/components'
import { AppContext } from '../app.context'



export default function Home({ navigation }) {
    const { user, location } = React.useContext(AppContext)
    return (
        <Box>
            <ImageBackground style={{ width: '100%' }} source={{ uri: 'https://images.unsplash.com/photo-1515757026668-f01a7685f66e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }}>
                <Box bgColor={'rgba(0, 0, 0, 0.7)'}>
                    <Box>
                        <Stack paddingY={10} paddingX={10} >

                            <Heading color={'white'}>Hi, {user ? user.displayName ? user.displayName : 'No Name' : 'No User'} </Heading>

                            <HStack space={1} alignItems={'center'} marginTop={0.5}>
                                <Icon type='feather' name='map-pin' color='#22c55e' size={14} />
                                <Text color={'white'} >{location ? location.area : 'No Location'} Connect</Text>
                            </HStack>

                        </Stack>
                    </Box>


                    <Box borderTopLeftRadius={20} borderTopRightRadius={20} bgColor={'coolGray.100'}>
                        <Container>
                            <HStack space={2} justifyContent='space-between'>
                                <PressableContainer onPress={() => navigation.navigate('forum')} color={'coolGray.200'} width={'1/2'} paddingX={3} paddingY={5} borderRadius={10} >
                                    <Heading size='sm' >Public Forum</Heading>
                                </PressableContainer>


                                <PressableContainer onPress={() => navigation.navigate('alertStack')} color={'coolGray.200'} width={'1/2'} paddingX={3} paddingY={5} borderRadius={10} >
                                    <Heading size='sm' >Alerts</Heading>
                                </PressableContainer>
                            </HStack>
                        </Container>
                    </Box>
                </Box>
            </ImageBackground>
            <ScrollView>
                <Container>
                    <Box>
                        <HStack justifyContent={'space-between'}>
                            <Heading size={'sm'}>Recent Alerts</Heading>
                            <Button onPress={() => navigation.navigate('alertStack')} variant={'ghost'}>See All</Button>
                        </HStack>
                        <Box>
                            {/* <Carousel 
                            data={[1,2,3,4,5,6,7]}
                            horizontal
                            renderItem={(item) => {
                                return <Box>Joel</Box>
                            }}
                            sliderWidth={'100%'}
                            sliderHeight={200}
                            windowSize={100}
                        /> */}
                        </Box>
                    </Box>


                    <Box>
                        <HStack justifyContent={'space-between'}>
                            <Heading size={'sm'}>Popular Forums</Heading>
                            <Button onPress={() => navigation.navigate('forums')} variant={'ghost'}>See All</Button>
                        </HStack>
                        <Box>

                        </Box>
                    </Box>


                    <Button onPress={() => navigation.navigate('forum')} >Forum</Button>
                    <Button onPress={() => navigation.navigate('forums')} >Forum List</Button>
                    <Button onPress={() => navigation.navigate('alertStack')} >Alert List</Button>
                    <Button onPress={() => navigation.navigate('alertComp')} >Alert</Button>
                    <Button onPress={() => navigation.navigate('searchStack')} >Search</Button>
                </Container>
            </ScrollView>
        </Box>


    )
}