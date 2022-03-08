import { Box, Text, HStack, Stack, Heading, Button, Pressable, ScrollView, Image } from 'native-base'
import { ImageBackground } from 'react-native'
import { Icon } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel'


import React from 'react'


import { Container, PressableContainer } from '../Components/components'
import { AppContext } from '../app.context'
import { AlertSliderContainer } from '../Components/alert.container'
import { JoinForumContainer } from '../Components/forum.components'



const __renderAlert = (props) => {
    return <AlertSliderContainer {...props} />
}
var alertCarousel

export default function Home({ navigation }) {
    const { user, location } = React.useContext(AppContext)
    const forums = [1, 1, 1, 1, 1, 1, 1]



    return (
        <Box height={'full'} bgColor={'coolGray.100'} >
            <ScrollView>
                <ImageBackground style={{ width: '100%' }} source={{ uri: 'https://images.unsplash.com/photo-1515757026668-f01a7685f66e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }}>
                    <Box bgColor={'rgba(0, 0, 0, 0.7)'}>
                        <Box>
                            <Stack paddingY={10} paddingX={10} >

                                <Heading color={'white'}>Hi, {user ? user.displayName ? user.displayName : 'No Name' : 'Joel Henry'} </Heading>

                                <HStack space={1} alignItems={'center'} marginTop={0.5}>
                                    <Icon type='feather' name='map-pin' color='#22c55e' size={14} />
                                    <Text color={'white'} >{location ? location.area : 'No Location'} Connect</Text>
                                </HStack>

                            </Stack>
                        </Box>


                        <Box borderTopLeftRadius={20} borderTopRightRadius={20} bgColor={'coolGray.100'}>
                            <Box marginTop={3}>
                                <HStack justifyContent='space-between'>
                                    <Box width={'1/2'} padding={2}>
                                        <PressableContainer onPress={() => navigation.navigate('forum')} color={'coolGray.200'} paddingX={3} paddingY={5} borderRadius={10} >
                                            <Heading size='sm' >Public Forum</Heading>
                                        </PressableContainer>
                                    </Box>

                                    <Box width={'1/2'} padding={2}>
                                        <PressableContainer onPress={() => navigation.navigate('alertStack')} color={'coolGray.200'} paddingX={3} paddingY={5} borderRadius={10} >
                                            <Heading size='sm' >Alerts</Heading>
                                        </PressableContainer>
                                    </Box>
                                </HStack>
                            </Box>
                        </Box>
                    </Box>
                </ImageBackground>


                <Box height={'70%'}>
                    <Container>
                        <HStack justifyContent={'space-between'}>
                            <Heading size={'sm'}>Recent Alerts</Heading>
                            <Button onPress={() => navigation.navigate('alertStack')} variant={'ghost'}>See All</Button>
                        </HStack>
                    </Container>
                    <HStack alignItems='center'>
                        <Carousel
                            ref={ref => alertCarousel = ref}
                            data={[1, 2, 3, 4, 5, 6, 7]}
                            sliderWidth={400}
                            itemWidth={200}
                            loop={true}
                            renderItem={({ ...props }) => __renderAlert({ navigation, ...props })}
                        />
                    </HStack>


                    <Box marginTop={5}>
                        <Container>
                            <HStack justifyContent={'space-between'}>
                                <Heading size={'sm'}>Popular Forums</Heading>
                                <Button onPress={() => navigation.navigate('forums')} variant={'ghost'}>See All</Button>
                            </HStack>
                        </Container>
                        <Container>
                            {forums.map((forum, key) => {
                                return <JoinForumContainer key={key} forum={forum} />
                            })}
                        </Container>
                    </Box>
                    <Box bgColor={'coolGray.200'} height={25} paddingY={10}></Box>
                </Box>
            </ScrollView>
        </Box>


    )
}