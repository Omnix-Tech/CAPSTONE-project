import React from 'react';

import { HStack, Box, Divider, Heading, Avatar, IconButton, Text, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'


export default function Post() {
    return (
        <>
            <Divider bgColor={'gray.900'} my={2} />
            <Box transition={'0.15s'} _hover={{ bgColor: 'rgba(255, 255, 255, 0.707)', cursor: 'pointer' }} width={'full'} marginBottom={2} padding={3} >

                <HStack justifyContent={'space-between'} alignItems={'flex-start'}>
                    <Avatar size={'sm'} />
                    <Box px={2}>
                        <Box>
                            <Heading lineHeight={'normal'} size={'sm'}>Username</Heading>
                            <Text fontSize={'xs'} color={'gray.700'}>10 mins ago</Text>
                        </Box>
                        <Box my={2} >
                            <Text fontSize={'sm'}>
                                Lorem ipsum dolor sit amet. Vel autem laudantium ex architecto quos aut dolore nemo ea itaque quae ut optio
                            </Text>
                        </Box>
                    </Box>
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            icon={<FeatherIcon icon={'more-horizontal'} />}
                            variant={'ghost'}
                        />
                        <MenuList>
                            <MenuItem>Report Post</MenuItem>
                        </MenuList>
                    </Menu>
                </HStack>

                <Divider my="1" />
                <HStack paddingX={2} justifyContent={'space-between'}>
                    <HStack alignItems={'center'}>
                        <IconButton size={'sm'} variant={'ghost'} icon={<FeatherIcon size={18} icon='thumbs-up' />} />
                        <Text>0</Text>
                    </HStack>
                    <HStack alignItems={'center'}>
                        <IconButton size={'sm'} variant={'ghost'} icon={<FeatherIcon size={18} icon='message-circle' />} />
                        <Text>0</Text>
                    </HStack>
                </HStack>



            </Box>

        </>

    );
}
