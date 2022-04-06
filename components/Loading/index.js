import React from 'react';


import { VStack, Spinner } from '@chakra-ui/react';

export default function Loading() {
  return <VStack w={'100vw'} h={'100vh'} justifyContent={'center'} alignItems={'center'} ><Spinner size={'lg'} /></VStack>
}
