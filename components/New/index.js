import React from 'react';

import { Box, Text, Tooltip, IconButton, Modal, ModalOverlay, ModalContent, useDisclosure, ModalHeader, ModalCloseButton, ModalBody, Tabs, TabList, Tab, TabPanels, TabPanel, HStack } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'
import NewPost from './NewPost';
import NewFourm from './NewFourm';


function NewModal({ location, user, ...props }) {
    return (
        <Modal
            {... props}
            size={'2xl'}
        >
            <ModalOverlay />
            <ModalContent overflowY={'scroll'} borderRadius={0} maxH={'80vh'}>

                <ModalCloseButton />

                <Tabs>
                    <ModalHeader pt={2} px={2}>
                        <TabList>
                            <Tab>
                                <HStack alignItems={'center'} fontSize={'sm'}>
                                    <FeatherIcon size={'16px'} icon={'message-square'} />
                                    <Text>New Post</Text>
                                </HStack>
                            </Tab>
                            <Tab>
                                <HStack alignItems={'center'} fontSize={'sm'}>
                                    <FeatherIcon size={'16px'} icon={'users'} />
                                    <Text>New Forum</Text>
                                </HStack>
                            </Tab>
                        </TabList>
                    </ModalHeader>

                    <ModalBody>
                        <TabPanels>
                            <TabPanel>
                                <NewPost location={location} user={user} closeModal={props.onClose} />
                            </TabPanel>
                            <TabPanel>
                                <NewFourm />
                            </TabPanel>
                        </TabPanels>

                    </ModalBody>
                </Tabs>
            </ModalContent>
        </Modal>
    )
}


export default function NewButton({ user, location }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalToggle = React.useRef()

    return (
        <>

            <NewModal user={user} location={location} isOpen={isOpen} onClose={onClose} finalFocusRef={modalToggle} />


            <Box zIndex={'modal'} position={'fixed'} bottom={{ base: 90, lg: 10 }} right={5}>
                <Tooltip label={'New Post'} >
                    <IconButton ref={modalToggle} onClick={onOpen} colorScheme={'linkedin'} boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.54)'} size={'lg'} borderRadius={'full'} icon={<FeatherIcon icon={'plus'} />} />
                </Tooltip>
            </Box>

        </>

    );
}
