import React from 'react';
import { Box, Text, VStack, Spinner, HStack } from '@chakra-ui/react';
import Post from '../Post';
import InfiniteScroll from 'react-infinite-scroll-component';
import usePosts from '../../controller/hooks/usePosts';


export default function Forum({ limit, location, user: currentUser, forum, allowPagination, ...props }) {

    const { posts, lastPost, getNextThresholdPosts } = usePosts({ location, forum })

    return (
        <Box {...props}>


            <Box>
                {posts === null ?
                    <VStack paddingY={2} justifyContent={'center'} alignContent={'center'} >
                        <Spinner />
                    </VStack>
                    : posts.length === 0
                        ?
                        <HStack paddingY={10} width={'full'} justifyContent={'center'}><Text color={'gray.400'} fontSize={'x-small'}>{(`No Posts`).toUpperCase()}</Text></HStack>
                        :

                        <InfiniteScroll
                            dataLength={posts.length}
                            next={getNextThresholdPosts}
                            hasMore={ allowPagination ?  allowPagination : lastPost !== null }
                            loader={<HStack paddingY={20} width={'full'} justifyContent={'center'}><Spinner size='lg' /></HStack>}
                            endMessage={ allowPagination === null | allowPagination === true ? <HStack paddingY={2} width={'full'} justifyContent={'center'}><Text color={'gray.400'} fontSize={'x-small'}>{(`That's it`).toUpperCase()}</Text></HStack> : <></>  }
                        >
                            {posts.map(post => {
                                return <Post key={post.post.id} postRef={post?.post} currentUser={currentUser} />
                            })}
                        </InfiniteScroll>
                }
            </Box>
        </Box>
    )
}