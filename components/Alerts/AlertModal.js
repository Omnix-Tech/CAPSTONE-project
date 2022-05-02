import { Box, CloseButton, Grid, Button, GridItem, Heading, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalOverlay, Text, ModalHeader } from '@chakra-ui/react';
import React from 'react';


const styles = {
    card: {
        background: 'rgba(255, 255, 255, 0.6)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(5px)',
        border: '1px solid rgba(255, 255, 255, 0.3)',
        borderRadius: 0
    }
}

export default function AlertModal({ isOpen, onClose, modalRef, alert }) {
    return (
        <>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                finalFocusRef={modalRef}
                size={'xl'}
            >
                <ModalOverlay />
                <ModalContent {...styles.card}>
                    <ModalHeader display={'flex'} justifyContent={'end'}>
                        <CloseButton onClick={onClose} />
                    </ModalHeader>

                    <ModalBody>
                        <Grid templateColumns={'repeat(12,1fr)'} >

                            <GridItem colSpan={{ base: 12, md: 12 }}>
                                <Image src={alert.media} objectFit={'contain'} />
                            </GridItem>

                            <GridItem colSpan={{ base: 12, md: 12 }}>
                                <Heading mt={2} size={'lg'}>
                                    {alert.title}
                                </Heading>

                                <Text fontSize={'xs'} color={'gray.700'}> {alert.source} </Text>


                                <Box mt={5} >
                                    <Text noOfLines={6}>
                                        {alert.content}
                                    </Text>
                                </Box>
                            </GridItem>
                        </Grid>
                    </ModalBody>

                    <ModalFooter justifyContent={'end'}>
                        <Button variant={'ghost'} colorScheme={'green'}>Learn More</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
