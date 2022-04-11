import { Box, FormControl, FormLabel, Input, Textarea } from '@chakra-ui/react';
import React from 'react';

export default function NewFourm() {
  return (
    <Box p={10}>
      <FormControl pb={10}>
        <FormLabel fontSize={'xs'}>Forum Title</FormLabel>
        <Input variant={'unstyled'} _placeholder={{ fontSize: 'sm' }} placeholder={"What's the forum's title?"} />
      </FormControl>

      <FormControl>
        <FormLabel fontSize={'xs'}>Description</FormLabel>
        <Textarea variant={'unstyled'} placeholder={'What is it about?'} />
      </FormControl>
    </Box>
  );
}
