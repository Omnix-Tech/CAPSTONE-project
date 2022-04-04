import React from 'react';


import { Box } from '@chakra-ui/react';
import ResponseInput from './ResponseInput';
import ResponsesContainer from './ResponsesContainer';

export default function Response({ ...props }) {
    return (
        <Box {...props}>
            <ResponsesContainer />
            <Box boxShadow={'0px -1px 16px -1px rgba(0,0,0,0.53)'} borderBottomRadius={10} py={2} bgColor={'whitesmoke'} position={'sticky'} bottom={5}>
                <ResponseInput />
            </Box>
        </Box>
    );
}
