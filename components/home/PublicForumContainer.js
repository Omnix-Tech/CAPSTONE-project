import React from 'react';
import { Box, Divider, Text, VStack, Spinner, HStack } from '@chakra-ui/react';
import Post from '../Post';
import InfiniteScroll from 'react-infinite-scroll-component';

import NewPostAlert from '../NewPostAlert';
import usePosts from '../../controller/hooks/usePosts';

export default function PublicForumContiner({ location, user: currentUser, ...props }) {

    const { posts, getThresholdPosts, lastPost, allowRefresh, handleRefresh } = usePosts(location)

    return (
        <Box {...props}>

            <Text px={5} color={'gray.400'} fontWeight={'medium'} textTransform={'uppercase'} fontSize={'xs'}>{location?.area} Forum</Text>
            <Divider my={2} />


            <Box h={'full'} borderRight={'1px'} borderLeft={'1px'} borderLeftColor={'gray.300'} borderRightColor={'gray.300'}>
                {posts === null ?
                    <VStack h={'50vh'} justifyContent={'center'} alignContent={'center'} >
                        <Spinner />
                    </VStack>
                    : posts.length === 0
                        ?
                        <HStack paddingY={10} width={'full'} justifyContent={'center'}><Text color={'gray.400'} fontSize={'x-small'}>{(`No Posts`).toUpperCase()}</Text></HStack>
                        :

                        <InfiniteScroll
                            dataLength={posts.length}
                            next={getThresholdPosts}
                            hasMore={lastPost !== null}
                            loader={<HStack paddingY={20} width={'full'} justifyContent={'center'}><Spinner size='lg' /></HStack>}
                            endMessage={<HStack paddingY={2} width={'full'} justifyContent={'center'}><Text color={'gray.400'} fontSize={'x-small'}>{(`That's it`).toUpperCase()}</Text></HStack>}
                        >
                            {posts.map(post => {
                                return <Post key={post.post.id} postRef={post?.post} currentUser={currentUser} />
                            })}
                        </InfiniteScroll>
                }
            </Box>


            <NewPostAlert refresh={allowRefresh} onClick={handleRefresh} />
        </Box>
    );
}


