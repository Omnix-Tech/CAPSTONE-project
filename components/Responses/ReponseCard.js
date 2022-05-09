import { SkeletonText, Avatar, Box, Button, Divider, HStack, Text } from '@chakra-ui/react';
import { doc, getDoc } from '@firebase/firestore';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json'
import React from 'react';
import { firestore } from '../../app/config/firebase.config';
import useRequestHandlers from '../../controller/handlers';


TimeAgo.setDefaultLocale(en)

const CardStyle = {
    alignItems: 'flex-start',
    color: 'gray.700',
    fontSize: 'sm',
    p: 15,
    w: 'full',
    transition: '0.25s',
    _hover: {
        bg: 'rgba(0,0,0,0.1)',
        cursor: 'pointer'
    }
}

export default function ReponseCard({ self, response }) {
    const timeago = new TimeAgo('en-US')

    const { Remove } = useRequestHandlers()
    const [user, setUser] = React.useState(null)


    const handleDeleteResponse = async () => {
       Remove(`api/response/${response.id}`)
       .then(res => {})
       .catch(error => console.log(error))
    }

    React.useEffect(() => {
        getDoc(doc(firestore, `Users/${response.user.id}`)).then(snapshot => setUser(snapshot.data()))
    }, [response])

    return (
        <>
            <Box
                {...CardStyle}
            >
                <HStack alignItems={'center'} >
                    <Avatar size={'sm'} />
                    <Box>
                        <HStack>
                            <Box color={self ? 'blue.600' : 'green.600'} fontWeight={'medium'}>{self ? 'You' : user ? `${user.firstName} ${user.lastName}` : <SkeletonText />}</Box>
                            <Box fontSize={'x-small'} >{timeago.format(response.timeStamp.toDate())}</Box>
                        </HStack>

                        {self ? <Button onClick={handleDeleteResponse} p={0} size={'xs'} variant={'link'}>Delete</Button> : <></>}
                    </Box>
                </HStack>
                <Divider my={2} />

                <Text> {response.content} </Text>
            </Box>
        </>

    );
}
