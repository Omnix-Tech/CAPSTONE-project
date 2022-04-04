import { Text, Box, HStack, IconButton, Input, Tooltip, InputGroup, InputAddon, Textarea } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'
import React from 'react';

export default function ResponseInput({ postRef, currentUser }) {
    return (
        <Box px={5} w={'full'}>
            <HStack justifyContent={'space-between'} alignItems={'flex-start'}>

                <InputGroup>
                    <InputAddon border={'none'} bgColor={'transparent'} borderRadius={'full'}>
                        <HStack alignItems={'center'}>
                            <Box p={1} bgColor={'messenger.300'} borderRadius={'full'}>
                            <FeatherIcon color={'white'} size={16} icon={'message-circle'} />
                            </Box>
                            
                            <Text fontSize={'xs'} >0</Text>
                        </HStack>

                        
                    </InputAddon>
                    <Textarea resize={'none'} size={'sm'} px={2} variant={'unstyled'} placeholder={'Type your response'} />
                </InputGroup>

                <Tooltip label={'Send Response'}>
                    <IconButton variant={'ghost'} colorScheme={'messenger'} borderRadius={'full'} size={'sm'} icon={<FeatherIcon size={20} icon={'send'} />} />
                </Tooltip>

            </HStack>
        </Box>
    );
}
