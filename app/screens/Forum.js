import { Box, Heading, HStack } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { AppContext } from '../app.context'
import { Post } from '../Components/post.container'

import { PostStack } from '../Components/elements'



export default function Forum({ navigation }) {
    const { user, location } = React.useContext(AppContext)
    const posts = [1, 2, 3, 4, 5, 6]
    return (
        <Box>
            <HStack space={2} justifyContent={'flex-end'} paddingX={6} paddingY={3} bgColor={'light.100'}>
                <Heading size={'sm'} >{location?.area} Connect</Heading>
                <Heading size={'sm'} color={'muted.400'} isTruncated >Public Forum</Heading>
            </HStack>
            <Box bgColor={'coolGray.100'}>
                <ScrollView >
                    <Box>
                        {posts.map((post, key) => {
                            return (
                                <Post key={key} />
                            )
                        })}
                    </Box>
                    <Box bgColor={'coolGray.200'} height={20} paddingY={10}></Box>
                </ScrollView>
            </Box>
            
            <PostStack />
        </Box>
    )
}