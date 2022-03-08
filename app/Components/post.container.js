import React from 'react'

import { Box, Avatar, HStack, Stack, VStack, Heading, Text, IconButton, Image, Divider } from 'native-base'
import { Icon } from 'react-native-elements'

export function Post() {
    const media = ['https://images.pexels.com/photos/235986/pexels-photo-235986.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg']
    return (
        <Box style={{ elevation: 1 }} bgColor={'light.100'} width={'full'} marginBottom={2} padding={2} borderRadius={0} >
            <HStack justifyContent={'space-between'} alignItems={'center'}>
                <HStack space={3} alignItems={'center'}>
                    <Avatar size={'sm'} />
                    <VStack>
                        <Heading size={'sm'}>John Doe</Heading>
                        <Text color={'muted.400'} >10 mins ago</Text>
                    </VStack>
                </HStack>

                <IconButton icon={<Icon type={'feather'} name={'more-horizontal'} />} />
            </HStack>
            <Box>
                <Text>
                    Lorem ipsum dolor sit amet. Vel autem laudantium ex architecto quos aut dolore nemo ea itaque quae ut optio
                </Text>
            </Box>

            <HStack space={2} m={2}>
                {media.map((source, index) => (
                    <Box key={index} w={50} h={50} borderRadius={10} overflow='hidden'>
                        <Image height={'full'} w={'full'} source={{uri: source}} />
                    </Box>
                ))}
            </HStack>
            <Divider my="1" />
            <HStack paddingX={2} justifyContent={'space-between'}>
                <HStack alignItems={'center'}>
                    <IconButton size={'sm'} icon={<Icon size={16} type='feather' name='thumbs-up' />} />
                    <Text>0 Like</Text>
                </HStack>
                <HStack alignItems={'center'}>
                    <IconButton size={'sm'} icon={<Icon size={16} type='feather' name='message-circle' />} />
                    <Text>0 Responses</Text>
                </HStack>
            </HStack>
        </Box>
    )
}