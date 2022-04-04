import React from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import ReponseCard from './ReponseCard';


const containerStyle = {
    bg: 'rgba(220,220,220,0.55)',
    backdropFilter: 'blur(10px)',
    mt: 3,
    borderTopRadius: 10,
    overflow: 'hidden',
    pb: 10
}

export default function ResponsesContainer() {
  return (
    <Box {...containerStyle}>
        {/* <HStack py={10} justifyContent={'center'} alignItems={'center'}><Text fontSize={'sm'} color={'gray.500'}>No Responses</Text></HStack> */}
        <ReponseCard self={true} />
        <ReponseCard self={true} />
        <ReponseCard self={false} />
    </Box>
  );
}
