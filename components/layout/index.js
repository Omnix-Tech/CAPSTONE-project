import { Divider, Button, Box, HStack, IconButton, Stack, useDisclosure, DrawerOverlay, Drawer, DrawerContent, DrawerCloseButton, DrawerBody, DrawerFooter, DrawerHeader, Avatar, Text } from '@chakra-ui/react'
import React from 'react'

import FeatherIcon from 'feather-icons-react'
import Link from 'next/link'

const { auth } = require('../../app/config/firebase.config')


function DrawerContainer({ isOpen, onClose, toggleRef, user }) {
  const notifications = []
  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement={{ base: 'left', lg: 'right' }}
      finalFocusRef={toggleRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />

        <DrawerHeader>
          <HStack alignItems={'center'} >
            <Avatar />
            <Box>
              <Text lineHeight={0} fontSize={'sm'} >{user?.displayName}</Text>
              <Button variant={'link'} size={'xs'}>Profile</Button>
            </Box>
          </HStack>
        </DrawerHeader>


        <DrawerBody py={0} position={'relative'}>
          <Box w={'full'} bgColor={'white'} top={0} position={'sticky'}>
            <Text fontWeight={'medium'} fontSize={'sm'} >Notifications</Text>
            <Divider my={2} />
          </Box>

          <Box maxHeight={'full'} >
            {notifications.map((_, key) => (
              <Box key={key}>1</Box>
            ))}
          </Box>


        </DrawerBody>


        <DrawerFooter>
          <HStack width={'full'} justifyContent={'space-between'}>
            <IconButton onClick={() => auth.signOut()} variant={'ghost'} icon={<FeatherIcon icon={'log-out'} />} />
            <Link passHref href={'/account'}>
              <IconButton as={'a'} variant={'ghost'} icon={<FeatherIcon icon={'settings'} />} />
            </Link>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

export default function Layout({ currentTab, children, user }) {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const drawerControl = React.useRef()



  return (
    <Box position={'relative'} minHeight={'100vh'} bgColor={'whitesmoke'} paddingLeft={{ base: 0, lg: 35 }}>
      <DrawerContainer onClose={onClose} isOpen={isOpen} toggleRef={drawerControl} user={user} />

      <Box p={3} zIndex={'docked'} bgColor={'white'} top={0} position={'sticky'}>
        <IconButton ml={5} onClick={onOpen} ref={drawerControl} variant={'ghost'} icon={<FeatherIcon icon={'menu'} />} />
      </Box>

      <Box position={'relative'} pl={{ base: 0, lg: 30 }} >
        <Box mb={{ base: 90, lg: 0 }} w={'full'}>
          {children}
        </Box>
      </Box>
      <Box zIndex={{ base: 'docked', lg: 'popover' }} boxShadow={{ base: '-2px -3px 16px -1px rgba(0,0,0,0.34)', lg: 'unset' }} bgColor={'white'} borderTopRadius={{ base: 0, lg: 0 }} position={'fixed'} bottom={0} left={0} right={{ base: 0, lg: 'unset' }} top={{ base: 'unset', lg: 0 }} paddingY={{ base: 3, lg: 'unset' }} paddingX={{ base: 'unset', lg: 2 }}>
        <Stack direction={{ base: 'row', lg: 'column' }} width={{ base: 'full', lg: 'unset' }} h={{ base: 'unset', lg: 'full' }} justifyContent={'space-evenly'} >
          <Box>
            <Link passHref href={'/'} >
              <IconButton color={currentTab === 'home' ? 'teal.400' : 'unset'} variant={'ghost'} icon={<FeatherIcon icon={'home'} />} />
            </Link>
          </Box>

          <Box>
            <Link passHref href={'/search'} >
              <IconButton color={currentTab === 'search' ? 'teal.400' : 'unset'} variant={'ghost'} icon={<FeatherIcon icon={'search'} />} />
            </Link>
          </Box>

          <Box>
            <Link passHref href={'/alerts'}>
              <IconButton color={currentTab === 'alerts' ? 'teal.400' : 'unset'} variant={'ghost'} icon={<FeatherIcon icon={'alert-circle'} />} />
            </Link>
          </Box>

          <Box>
            <Link passHref href={'/connect'} >
              <IconButton color={currentTab === 'connect' ? 'teal.400' : 'unset'} variant={'ghost'} icon={<FeatherIcon icon={'map-pin'} />} />
            </Link>
          </Box>

        </Stack>
      </Box>
    </Box>

  )
}
