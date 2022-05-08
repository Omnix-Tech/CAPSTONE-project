import React from 'react';


import { Box } from '@chakra-ui/react';
import ResponseInput from './ResponseInput';
import ResponsesContainer from './ResponsesContainer';
import useResponse from '../../controller/hooks/useResponse';
import useFeedback from '../../controller/hooks/useFeedback';

export default function Response({ post, currentUser, ...props }) {


    const { responses } = useResponse({ post })
    const { showError, showSuccess, render } = useFeedback()



    return (
        <>
        {render()}
        <Box {...props}>
            <ResponsesContainer responses={responses} currentUser={currentUser} />
            <Box boxShadow={'0px -1px 16px -1px rgba(0,0,0,0.53)'} borderBottomRadius={10} py={2} bgColor={'whitesmoke'} position={'sticky'} bottom={5}>
                {post && currentUser ? <ResponseInput showSuccess={showSuccess} showError={showError} post={post} currentUser={currentUser} /> : <></>}
            </Box>
        </Box>
        </>
        
    );
}
