import React from 'react';

import { Box, Text, Tooltip, IconButton, Modal, ModalOverlay, ModalContent, useDisclosure, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Tabs, TabList, Tab, TabPanels, TabPanel, HStack } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'


function NewPost({ isOpen, onClose, modalToggle }) {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            finalFocusRef={modalToggle}
            size={'2xl'}
        >
            <ModalOverlay />
            <ModalContent>

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
                                New Post
                            </TabPanel>
                            <TabPanel>
                                Create Forum
                            </TabPanel>
                        </TabPanels>

                    </ModalBody>
                </Tabs>


                <ModalFooter>

                </ModalFooter>

            </ModalContent>
        </Modal>
    )
}


export default function NewButton() {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalToggle = React.useRef()

    return (
        <>

            <NewPost isOpen={isOpen} onClose={onClose} modalToggle={modalToggle} />


            <Box zIndex={'modal'} position={'fixed'} bottom={{ base: 90, lg: 10 }} right={5}>
                <Tooltip label={'New Post'} >
                    <IconButton ref={modalToggle} onClick={onOpen} colorScheme={'linkedin'} boxShadow={'-2px -3px 16px -1px rgba(0,0,0,0.54)'} size={'lg'} borderRadius={'full'} icon={<FeatherIcon icon={'plus'} />} />
                </Tooltip>
            </Box>

        </>

    );
}
