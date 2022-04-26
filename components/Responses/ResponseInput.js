import { Text, Box, HStack, IconButton, Tooltip, InputGroup, InputAddon, Textarea } from '@chakra-ui/react';
import { collection, where, query, onSnapshot } from '@firebase/firestore';
import FeatherIcon from 'feather-icons-react'
import React from 'react';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

import { firestore } from '../../app/config/firebase.config'

import useAPIs from '../../controller/handlers';

export default function ResponseInput({ post, currentUser }) {
    const { createResponse } = useAPIs()

    const responseQuery = query(
        collection(firestore, 'Responses'),
        where('post', '==', post)
    )

    const [snapshot] = useCollectionOnce(responseQuery)
    const [responseContent, setResponseContent] = React.useState('')
    const [responseCount, setResponseCount] = React.useState(0)


    const handleResponseSubmit = () => {
        createResponse({
            content: responseContent, post: post.id, user: currentUser.uid
        })
            .then(data => {
                setResponseContent('')
                alert('sent')
            })
            .catch(error => alert(error.message))

    }

    const listenForNewUpdates = () => {
        onSnapshot(responseQuery, (querySnapshot) => {
            console.log('Response Listening')
            if (responseCount != querySnapshot.size) setResponseCount(querySnapshot.size)
        })
    }

    React.useEffect(() => {
        if (snapshot) setResponseCount(snapshot.size)
    }, [snapshot])


    React.useEffect(() => {
        listenForNewUpdates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [responseCount])

    return (
        <Box px={5} w={'full'}>
            <HStack justifyContent={'space-between'} alignItems={'flex-start'}>

                <InputGroup>
                    <InputAddon border={'none'} bgColor={'transparent'} borderRadius={'full'}>
                        <HStack alignItems={'center'}>
                            <Box p={1} bgColor={'messenger.300'} borderRadius={'full'}>
                                <FeatherIcon color={'white'} size={16} icon={'message-circle'} />
                            </Box>

                            <Text fontSize={'xs'} > {responseCount}</Text>
                        </HStack>


                    </InputAddon>
                    <Textarea resize={'none'} size={'sm'} px={2} variant={'unstyled'} placeholder={'Type your response'} value={responseContent} onChange={(e) => setResponseContent(e.target.value)} />
                </InputGroup>

                <Tooltip label={'Send Response'}>
                    <IconButton onClick={handleResponseSubmit} disabled={responseContent === ''} variant={'ghost'} colorScheme={'messenger'} borderRadius={'full'} size={'sm'} icon={<FeatherIcon size={20} icon={'send'} />} />
                </Tooltip>

            </HStack>
        </Box>
    );
}
