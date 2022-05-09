import { Box, Divider, FormControl, FormLabel, Input, Textarea, Text, SimpleGrid, HStack, Tooltip, Button } from '@chakra-ui/react';
import React from 'react';
import useRequestHandlers from '../../controller/handlers';

import useConnect from '../../controller/hooks/useConnect'

export default function NewForum({ user, closeModal, showError, showSuccess }) {
  const { Post } = useRequestHandlers()
  const { connectsDocs } = useConnect(user)
  const [disabled, setDisabled] = React.useState(false)
  const [forum_data, setForumData] = React.useState({
    title: '', description: '', connects: []
  })

  const handleAddandRemoveConnect = (connect) => {
    if (forum_data.connects.includes(connect)) {
      const index = forum_data.connects.indexOf(connect)
      const connects = JSON.parse(JSON.stringify(forum_data.connects))
      connects.splice(index, 1)
      setForumData({ ...forum_data, connects })
    } else {
      setForumData({ ...forum_data, connects: [...forum_data.connects, connect] })
    }
  }

  const handleSubmit = () => {
    setDisabled(true)
    Post(`api/forum`, {
      uid: user.uid,
      title: forum_data.title,
      description: forum_data.description,
      connects: forum_data.connects
    })
      .then(res => {
        showSuccess({ message: 'Forum Created' })
        closeModal()
      })
      .catch(error => {
        setDisabled(false)
        showError({ message: 'Something went wrong' })
      })
  }

  return (
    <Box p={10}>
      <FormControl pb={10}>
        <FormLabel fontSize={'xs'}>Forum Title</FormLabel>
        <Input onChange={(e) => setForumData({ ...forum_data, title: e.target.value })} variant={'unstyled'} _placeholder={{ fontSize: 'sm' }} placeholder={"What's the forum's title?"} />
      </FormControl>

      <FormControl>
        <FormLabel fontSize={'xs'}>Description</FormLabel>
        <Textarea onChange={(e) => setForumData({ ...forum_data, description: e.target.value })} variant={'unstyled'} _placeholder={{ fontSize: 'sm' }} placeholder={'What is it about?'} />
      </FormControl>

      <Divider my={5} />

      <FormLabel fontSize={'xs'}>Select Connects</FormLabel>
      <SimpleGrid minChildWidth={120} my={3}>
        {connectsDocs ? <>
          {connectsDocs.map(doc => (
            <Box key={doc.place_id} p={1}>
              <Box
                onClick={() => handleAddandRemoveConnect(doc.place_id)}
                p={3}
                textColor={forum_data.connects.includes(doc.place_id) ? 'white' : 'black'}
                borderRadius={2}
                transition={'.25s'}
                bgColor={forum_data.connects.includes(doc.place_id) ? 'messenger.300' : 'gray.100'}
                _hover={{ cursor: 'pointer', bgColor: forum_data.connects.includes(doc.place_id) ? 'messenger.500' : 'gray.300' }} >
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
            disabled={(forum_data.title === '' | forum_data.connects.length === 0) && !disabled}
            onClick={handleSubmit}
          >Create Forum</Button>
        </Tooltip>
      </HStack>

    </Box>
  );
}
