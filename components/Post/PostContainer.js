import { Menu, MenuButton, MenuItem, MenuList, Heading, IconButton, Avatar, HStack, Box, Skeleton, SkeletonText, Divider, Grid, GridItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay, Text, Image } from '@chakra-ui/react';
import React from 'react';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import { Carousel } from 'react-responsive-carousel';

import FeatherIcon from 'feather-icons-react'


import { useDownloadURL } from 'react-firebase-hooks/storage';
import { ref as storageRef } from 'firebase/storage'
import { storage } from '../../config/firebase.config'
import LikeButton from '../LikeButton';
import Response from '../Responses';

TimeAgo.addLocale(en)



function File({ file }) {

  const [url, loading] = useDownloadURL(storageRef(storage, file))
  return (
    <>
      <Box maxH={'80vh'} width={'100%'}>
        {loading ? <Skeleton width={'full'} height={'80vh'} /> : <Image alt='' loading='lazy' src={url} objectFit={'scale-down'} />}
      </Box>
    </>
  )
}


export default function PostContainer({ post, user, files, currentUser, loading, fileLoading, postRef: ref, ...modalControl }) {
  const timeago = new TimeAgo('en-US')
  return (
    <Modal
      {...modalControl}
      size={'full'}
    >
      <ModalOverlay />

      <ModalContent py={0} pl={{base: 'unset', md: 50}} h={'100vh'} borderRadius={0} bgRepeat={'no-repeat !important'} bgPosition={'unset'} bgSize={'cover !important'} bg={`url('/images/bg.jpg')`}>
        <Box h={'full'} bg={'rgba(255,255,255,0.4)'} backdropFilter={'blur(20px)'}  overflowY={'scroll'}>
          <ModalCloseButton />
          <ModalBody pt={50}>
            <Grid templateColumns={'repeat(12,1fr)'} >
              <GridItem colSpan={{ base: 12, md: 4 }} >

                <HStack justifyContent={'flex-start'} alignItems={'flex-start'}>
                  <Avatar size={'sm'} />
                  <HStack w={'full'} justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Box px={2} >
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
                <HStack paddingX={2} justifyContent={'flex-end'}>
                  <LikeButton postRef={ref} currentUser={currentUser} />
                </HStack>


                <Response display={{ base: 'none', md: 'unset' }} />
              </GridItem>


              <GridItem colSpan={{ base: 12, md: 8 }} >

                <Box position={{base: 'unset', md: 'sticky'}} top={10} px={{ base: 0, md: 10 }} mt={5} >
                  {fileLoading ? <></> :

                    <>
                      {files.length === 0 ? <></>
                        :
                        <Carousel>

                          {files.map(file => (<File key={file.file} file={file.file} />))}

                        </Carousel>}
                    </>
                  }
                </Box>

                <Response display={{ base: 'unset', md: 'none' }} />
              </GridItem>
            </Grid>
          </ModalBody>
        </Box>

      </ModalContent>
    </Modal>
  );
}
