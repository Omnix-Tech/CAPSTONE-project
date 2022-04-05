import React from 'react';


import { Box } from '@chakra-ui/react';
import ResponseInput from './ResponseInput';
import ResponsesContainer from './ResponsesContainer';
import { collection, orderBy, query, where } from '@firebase/firestore';
import { firestore } from '../../app/config/firebase.config';
import { useCollectionOnce } from 'react-firebase-hooks/firestore';

export default function Response({ post, currentUser, ...props }) {



    const responseQuery = query(
        collection(firestore, 'Responses'),
        where('post', '==', post),
        orderBy('timeStamp', 'asc')
    ) 

    const [snapshot, loading, error ] = useCollectionOnce(responseQuery)
    const [responses, setResponses] = React.useState(null)


   

    React.useEffect(() => {

        if (snapshot) setResponses( snapshot.docs.map( doc => {
            return {
                data: doc.data(),
                ref: doc.ref
            }
        }))

    }, [snapshot])


    return (
        <Box {...props}>
            <ResponsesContainer responses={responses} currentUser={currentUser} />
            <Box boxShadow={'0px -1px 16px -1px rgba(0,0,0,0.53)'} borderBottomRadius={10} py={2} bgColor={'whitesmoke'} position={'sticky'} bottom={5}>
                {post && currentUser ? <ResponseInput post={post} currentUser={currentUser} /> : <></>}
            </Box>
        </Box>
    );
}
