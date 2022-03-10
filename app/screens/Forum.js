import { Box, Heading, HStack, IconButton } from 'native-base'
import React from 'react'
import { AppContext } from '../app.context'
import { Post } from '../Components/post.container'

import { PostStack } from '../Components/elements'
import { Icon } from 'react-native-elements'

import { FlatList } from 'react-native'



export default function Forum({ navigation }) {
    const { user, location } = React.useContext(AppContext)
    const posts = [1, 2, 3, 4, 5, 6]
    const isPublic = false
    return (
        <Box>
            <HStack alignItems={'center'} justifyContent={'space-between'} paddingX={6} paddingY={3} bgColor={'light.100'}>
                {isPublic ? (<IconButton icon={<Icon type={'feather'} name={'corner-left-down'} />} />) : (<Heading size={'sm'} color={'muted.400'} isTruncated >Public Forum</Heading>)}
                <Heading size={'sm'} >{location?.area} Connect</Heading>
            </HStack>
            <Box bgColor={'coolGray.100'}>
                <FlatList
                    data={posts}
                    renderItem={(props) => <Post {...props} navigation={navigation} />}
                    maxToRenderPerBatch={8}
                    bounces={true}
                    bouncesZoom={true}
                    keyExtractor={(item, index) => index}
                />
                <Box height={40}></Box>
                <Box height={30}></Box>
            </Box>

            <PostStack />
        </Box>
    )
}