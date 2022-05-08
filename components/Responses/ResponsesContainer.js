import React from 'react';
import { Box, HStack, Text, Spinner } from '@chakra-ui/react';
import ReponseCard from './ReponseCard';


const containerStyle = {
  bg: 'rgba(220,220,220,0.55)',
  backdropFilter: 'blur(10px)',
  mt: 3,
  borderTopRadius: 10,
  overflow: 'hidden',
  pb: 10
}

export default function ResponsesContainer({ responses, currentUser }) {
 
 
  return (
    <Box {...containerStyle}>
      {!responses ?
        <HStack py={10} justifyContent={'center'} alignItems={'center'}><Spinner /></HStack>
        : responses.length === 0 ?
          <HStack py={10} justifyContent={'center'} alignItems={'center'}><Text fontSize={'sm'} color={'gray.500'}>No Response</Text></HStack>
          :
          responses.map(response => <ReponseCard key={response.id} self={ response.user.id === currentUser.uid } response={response} />)
      }
    </Box>
  );
}
