import { Box, HStack, Text, VStack, Spinner, ScrollView, Button } from 'native-base'
import Animated from 'react-native-reanimated'
import React from 'react'
import { Icon } from 'react-native-elements'
import { AppContext } from '../app.context'
import { PressableContainer } from '../Components/components'

import { useWindowDimensions } from 'react-native'

import { AlertContainer } from '../Components/alert.container'
import { Post } from '../Components/post.container'
import { FlatList } from 'react-native'



const PostSearchResults = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [postResults, setResults] = React.useState(null)

    React.useEffect(() => {
        setResults([1, 2, 3, 2, 3, 2, 2,1,1,1,2,3,,31,3,13,1,31,23,13,123,1,31,3,13,13,1,31,3,14, 2, 4, 24, 24, , 2])
        setIsLoading(false)
    }, [])

    return (
        <Box height={'full'} paddingTop={5}>
            {isLoading ?
                <VStack height={'60%'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner size="lg" />
                </VStack> :
                (
                    <>
                        {postResults.length === 0 ?
                            <VStack height={'60%'} justifyContent={'center'} alignItems={'center'}>
                                <Text bold color={'muted.400'} >No Alerts</Text>
                            </VStack>
                            :
                            <>
                                <FlatList 
                                    data={postResults}
                                    renderItem={props => <Post {... props} navigation={navigation} />}
                                    keyExtractor={(item, index) => index}
                                    bouncesZoom={true}
                                    bounces={true}
                                    maxToRenderPerBatch={8}
                                />
                                <Box height={70} />
                            </>
                        }
                    </>
                )
            }

        </Box>
    )
}


const ForumSearchResults = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [forumResults, setResults] = React.useState(null)

    React.useEffect(() => {
        setResults([1, 2, 3, 2, 3, 2, 24, 2, 4, 24, 24, , 2])
        setIsLoading(false)
    }, [])

    return (
        <Box height={'full'} paddingTop={5}>
            {isLoading ?
                <VStack height={'60%'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner size="lg" />
                </VStack> :
                (
                    <>
                        {forumResults.length === 0 ?
                            <VStack height={'60%'} justifyContent={'center'} alignItems={'center'}>
                                <Text bold color={'muted.400'} >No Alerts</Text>
                            </VStack>
                            :
                            <>
                                <FlatList 
                                    data={forumResults}
                                    renderItem={props => <Post {... props} navigation={navigation} />}
                                    keyExtractor={(item, index) => index}
                                    bouncesZoom={true}
                                    bounces={true}
                                    maxToRenderPerBatch={8}
                                />
                                <Box height={70} />
                            </>
                        }
                    </>
                )
            }

        </Box>
    )
}


const AlertSearchResults = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true)
    const [alertResults, setResults] = React.useState(null)
    console.log(navigation)
    React.useEffect(() => {
        setResults([1, 2, 3, 2, 3, 2, 24, 2, 4, 24, 24, , 2,1,2,3,2,231,31,31,3,12,31,32,31,3,1,31,3,13,13,1,3])
        setIsLoading(false)
    }, [])

    return (
        <Box height={'full'} paddingTop={5}>
            {isLoading ?
                <VStack height={'60%'} justifyContent={'center'} alignItems={'center'}>
                    <Spinner size="lg" />
                </VStack> :
                (
                    <>
                        {alertResults.length === 0 ?
                            <VStack height={'60%'} justifyContent={'center'} alignItems={'center'}>
                                <Text bold color={'muted.400'} >No Alerts</Text>
                            </VStack>
                            :
                            <>
                                <FlatList 
                                    data={alertResults}
                                    renderItem={props => <AlertContainer {... props} navigation={navigation} />}
                                    keyExtractor={(item, index) => index}
                                    bouncesZoom={true}
                                    bounces={true}
                                    maxToRenderPerBatch={8}
                                />
                                <Box height={70} />
                            </>
                        }
                    </>
                )
            }

        </Box>
    )
}


const tabContent = (props) => {
    
    return [
        {
            element: <PostSearchResults {...props} />,
            title: 'Posts'
        },
        {
            element: <ForumSearchResults {...props} />,
            title: 'Forums'
        },
        {
            element: <AlertSearchResults {...props} />,
            title: 'Alerts'
        }

    ]
}

const TabView = ({ context, index, props, setIndex }) => {

    const viewOptions = context(props)
    return (
        <>
            <HStack justifyContent={'space-evenly'}>
                {viewOptions.map((content, key) => {
                    return <Button onPress={() => setIndex(key)} key={key} width={'1/3'} variant={index === key ? 'filled' : 'ghost'} >{content.title}</Button>
                })}
            </HStack>

            {viewOptions[index].element}
        </>
    )
}


export default function SearchResults({ navigation, route }) {
    const [isLoading, setIsLoading] = React.useState(false)
    const searchParam = route.params.searchParam
    const [index, setIndex] = React.useState(0);

    return (
        <Box bgColor={'coolGray.200'}>
            <PressableContainer onPress={() => navigation.navigate('search')}>
                <HStack paddingX={6} paddingY={5} alignItems={'center'} justifyContent={'space-between'} borderBottomRadius={20} bgColor={'light.100'}>

                    <Text fontSize={'md'} paddingLeft={3} color={'muted.500'}>{searchParam}</Text>
                    <Icon type={'feather'} name={'search'} />

                </HStack>
            </PressableContainer>



            <Box bgColor={'light.100'} marginTop={3} borderTopRadius={20} height={'full'} overflow='hidden'>

                {isLoading ?
                    <VStack height={'60%'} justifyContent={'center'} alignItems={'center'}>
                        <Spinner size="lg" />
                    </VStack>
                    :
                    <TabView
                        context={tabContent}
                        setIndex={setIndex}
                        index={index}
                        props={{ navigation }}
                    />

                }
            </Box>
        </Box>
    )
}