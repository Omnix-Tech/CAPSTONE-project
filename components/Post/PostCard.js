import { Box, HStack, Divider, Avatar, Heading, Text, Skeleton, SkeletonText, Menu, MenuList, MenuItem, MenuButton, IconButton, Image } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import React from 'react';

import { useDownloadURL } from 'react-firebase-hooks/storage'
import { ref as storageRef } from 'firebase/storage'
import { storage } from '../../app/config/firebase.config'
import LikeButton from '../LikeButton';
import ResponseInput from '../Responses/ResponseInput'


TimeAgo.addLocale(en)
const scrollCSS = {
    overflowX: 'auto',
    css: {
        '&::-webkit-scrollbar': {
            width: '4px',
        },
        '&::-webkit-scrollbar-track': {
            width: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'none',
            borderRadius: '24px',
        },
    }
}



function File({ file, isMore, currentIndex, noMore }) {

    const [url, loading] = useDownloadURL(storageRef(storage, file))
    const isLast = currentIndex == 2

    return (
        <>
            {isMore && isLast
                ? <>
                    <Box borderRadius={10} overflow={'hidden'} position={'relative'}>
                        {loading ? <Skeleton width={'full'} height={170} /> : <Image alt='' src={url} w={'full'} h={'auto'} maxH={300} />}
                        <HStack justifyContent={'center'} fontWeight={'medium'} bgColor={'rgba(0,0,0,0.6)'} transition={'0.5s'} _hover={{ bgColor: 'rgba(0,0,0,0.8)' }} position={'absolute'} top={0} left={0} right={0} bottom={0}>
                            <FeatherIcon size={18} color={'white'} icon={'plus'} />
                            <Text color={'white'} >{noMore}</Text>
                        </HStack>
                    </Box>
                </>
                : <>
                    <Box transition={'0.5s'} _hover={{ bgColor: 'rgba(0,0,0,0.3)' }} borderRadius={10} overflow={'hidden'} position={'relative'}>
                        {loading ? <Skeleton width={'full'} height={170} /> : <Image alt='' src={url} w={'full'} h={'auto'} maxH={300} />}
                    </Box>
                </>}



        </>
    )
}

export default function PostCard({ files, post, user, currentUser, loading, fileLoading, postRef: ref, onOpen }) {
    const timeago = new TimeAgo('en-US')



    return (
        <Box>
            <Divider bgColor={'gray.300'} />
            <Box transition={'0.15s'} bgColor={'whiteAlpha.300'} _hover={{ bgColor: 'white', cursor: 'pointer' }} width={'full'} marginBottom={2} padding={3} >
                <HStack justifyContent={'flex-start'} alignItems={'flex-start'}>
                    <Avatar onClick={onOpen} size={'sm'} />
                    <HStack w={'full'} justifyContent={'space-between'} alignItems={'flex-start'}>
                        <Box px={2} onClick={onOpen} >
                            <Box>
                                {user ? <Heading transition={'0.25s'} _hover={{ color: 'messenger.400' }} lineHeight={'normal'} size={'sm'}>{`${user?.firstName} ${user?.lastName}`}</Heading> : <SkeletonText noOfLines={1} />}
                                <Text fontSize={'xs'} color={'gray.700'}>{timeago && post ? timeago?.format(post?.timeStamp.toDate()) : ''}</Text>
                            </Box>
                            <Box my={2} >
                                {loading
                                    ? <Skeleton noOfLines={3} />
                                    :
                                    <Text fontSize={'sm'}>{post?.content}</Text>}
                            </Box>
                            {fileLoading ?
                                <></> :

                                files.length === 0 ? <></>
                                    :
                                    <>
                                        <Divider my={2} />
                                        <Box>
                                            <HStack {...scrollCSS} minH={100} h={'fit-content'} >
                                                {files.length > 3 ? files.slice(0, 3).map((file, index) => {
                                                    return (
                                                        <File key={file.file} file={file.file} currentIndex={index} isMore={true} noMore={files.length - 3} />
                                                    )
                                                }) : files.map((file, index) => {
                                                    return (
                                                        <File key={file.file} file={file.file} currentIndex={index} isMore={false} />
                                                    )
                                                })}
                                            </HStack>
                                        </Box>
                                    </>}

                        </Box>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={<FeatherIcon icon={'more-horizontal'} />}
                                variant={'ghost'}
                                size={'sm'}
                            />
                            <MenuList>
                                <MenuItem>Report Post</MenuItem>
                                {loading ? <></> : post?.user?.id === currentUser?.uid ? <MenuItem>Edit Post</MenuItem> : <></>}
                            </MenuList>
                        </Menu>
                    </HStack>
                </HStack>

                <Divider my="1" />
                <HStack paddingX={2} justifyContent={'space-between'} alignItems={'flex-start'} >
                    <ResponseInput post={ref} currentUser={currentUser} />
                    <LikeButton postRef={ref} currentUser={currentUser} />
                </HStack>
            </Box>
        </Box>
    );
}
