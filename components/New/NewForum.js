import { Box, Divider, FormControl, FormLabel, Input, Textarea, Text, SimpleGrid, HStack, Tooltip, Button } from '@chakra-ui/react';
import React from 'react';
import FeatherIcon from 'feather-icons-react'

import useConnect from '../../controller/hooks/useConnect'

export default function NewForum({ user }) {
  const { connectsDocs } = useConnect(user)
  return (
    <Box p={10}>
      <FormControl pb={10}>
        <FormLabel fontSize={'xs'}>Forum Title</FormLabel>
        <Input variant={'unstyled'} _placeholder={{ fontSize: 'sm' }} placeholder={"What's the forum's title?"} />
      </FormControl>

      <FormControl>
        <FormLabel fontSize={'xs'}>Description</FormLabel>
        <Textarea variant={'unstyled'} _placeholder={{ fontSize: 'sm' }} placeholder={'What is it about?'} />
      </FormControl>

      <Divider my={5} />

      <FormLabel fontSize={'xs'}>Select Connects</FormLabel>
      <SimpleGrid minChildWidth={40}>
        {connectsDocs ? <>
          {connectsDocs.map(doc => (
            <Box key={doc.place_id} p={1}>
              <Box p={3} borderRadius={2} transition={'.25s'} bgColor={'gray.100'} my={3} _hover={{ cursor: 'pointer', bgColor: 'gray.300'}} >
                <Text fontWeight={'medium'} fontSize={'sm'} >{doc.area}</Text>
              </Box>
            </Box>

          ))}
        </> : <></>}
      </SimpleGrid>
      <Text fontSize={'xs'}>Forums will only be available in selected Connects</Text>

      <Divider my={5} />

      <HStack spacing={5} justifyContent={'flex-end'} alignItems={'center'}>
        <Tooltip label={'Create Forum'}>
          <Button
            colorScheme={'messenger'}
            fontSize={'xs'}
            textTransform={'uppercase'}
            size={'md'}

          >Create Forum</Button>
        </Tooltip>
      </HStack>


    </Box>
  );
}
