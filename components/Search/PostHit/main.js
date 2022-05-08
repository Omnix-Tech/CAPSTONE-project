import React from 'react'

import { Box, HStack, Text, Divider, IconButton } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'
import usePostHit from './hook'
import Post from '../../Post'

export default function MainPostHit({ post, user, connect }) {

    const { access, forum, location, postReference } = usePostHit({ post, user, connect })


    if (!access) return <></>

    return (
        <>
            <Post
                postRef={postReference}
                currentUser={user}
                render={({ onOpen }) => (
                    <Box transition={'.25s'} _hover={{ cursor: 'pointer', bgColor: 'rgba(255,255,255,0.7)' }}>
                        <HStack onClick={onOpen} px={5} py={5} color={'gray.800'} justifyContent={'space-between'} alignItems={'center'}>
                            <Box>
                                <Text fontSize={'sm'} noOfLines={2}>{post.content}</Text>
                                <Text fontSize={'x-small'} fontWeight={'medium'}>{forum ? `${forum.title} Forum` : `${location ? location.area : ''} Public Forum`}</Text>
                            </Box>
                            <IconButton onClick={onOpen} colorScheme={'blackAlpha'} variant={'ghost'} borderRadius={'full'} size={'sm'} icon={<FeatherIcon size={16} icon={'arrow-up-right'} />} />
                        </HStack>
                        <Divider />
                    </Box>
                )} />
        </>

    )
}