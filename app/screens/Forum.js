import { Box, Heading, HStack, IconButton } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { AppContext } from '../app.context'
import { Post } from '../Components/post.container'

import { PostStack } from '../Components/elements'
import { Icon } from 'react-native-elements'



export default function Forum({ navigation }) {
    const { user, location } = React.useContext(AppContext)
    const posts = [1, 2, 3, 4, 5, 6]
    const isPublic = true
    return (
        <Box>
            <HStack alignItems={'center'} justifyContent={'space-between'} paddingX={6} paddingY={3} bgColor={'light.100'}>
                { isPublic ? (<IconButton icon={<Icon type={'feather'} name={'corner-left-down'} />} />) : (<Heading size={'sm'} color={'muted.400'} isTruncated >Public Forum</Heading>)}
                <Heading size={'sm'} >{location?.area} Connect</Heading>
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
                    <Box bgColor={'coolGray.200'} height={40}></Box>
                    <Box bgColor={'coolGray.200'} height={30}></Box>
                </ScrollView>
            </Box>

            <PostStack />
        </Box>
    )
}