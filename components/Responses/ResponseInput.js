import { Text, Box, HStack, IconButton, Tooltip, InputGroup, InputAddon, Textarea } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'
import React from 'react';

import useAPIs from '../../controller/handlers';
import useResponse from '../../controller/hooks/useResponse';

export default function ResponseInput({ post, currentUser, showSuccess, showError }) {
    const { createResponse } = useAPIs()
    const { responses } = useResponse({ post })

    const [responseContent, setResponseContent] = React.useState('')


    const handleResponseSubmit = () => {
        createResponse({
            content: responseContent, post: post.id, user: currentUser.uid
        })
            .then(data => {
                setResponseContent('')
                showSuccess({ message: 'Sent'})
            })
            .catch(error => showError({message: 'Something went wrong'}))
    }

    return (
        <Box px={5} w={'full'}>
            <HStack justifyContent={'space-between'} alignItems={'flex-start'}>

                <InputGroup>
                    <InputAddon border={'none'} bgColor={'transparent'} borderRadius={'full'}>
                        <HStack alignItems={'center'}>
                            <Box p={1} bgColor={'messenger.300'} borderRadius={'full'}>
                                <FeatherIcon color={'white'} size={16} icon={'message-circle'} />
                            </Box>

                            <Text fontSize={'xs'} > { responses ? responses.length : 0 }</Text>
                        </HStack>


                    </InputAddon>
                    <Textarea resize={'none'} size={'xs'} px={2} variant={'unstyled'} placeholder={'Type your response'} value={responseContent} onChange={(e) => setResponseContent(e.target.value)} />
                </InputGroup>

                <Tooltip label={'Send Response'}>
                    <IconButton onClick={handleResponseSubmit} disabled={responseContent === ''} variant={'ghost'} colorScheme={'messenger'} borderRadius={'full'} size={'sm'} icon={<FeatherIcon size={20} icon={'send'} />} />
                </Tooltip>

            </HStack>
        </Box>
    );
}
