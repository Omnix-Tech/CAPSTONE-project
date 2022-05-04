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

function linkify(text) {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig
    return text.replace(urlRegex, url => {
        return `<a target='_blank' href='${url}' >${url}</a>`
    })
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

                            <GridItem display={'flex'} justifyContent={'center'} colSpan={{ base: 12, md: 12 }}>
                                <Image maxH={'50vh'} src={alert.media} objectPosition={'contain'} />
                            </GridItem>

                            <GridItem colSpan={{ base: 12, md: 12 }}>
                                <Heading mt={2} size={'lg'}>
                                    {alert.title}
                                </Heading>



                                <Text fontSize={'xs'} color={'gray.700'}> {alert.source} </Text>


                                <Box mt={5} >
                                    <Text noOfLines={6}
                                        dangerouslySetInnerHTML={{
                                            __html: linkify(alert.content)
                                        }} />
                                </Box>
                            </GridItem>
                        </Grid>
                    </ModalBody>

                    <ModalFooter justifyContent={'end'}>
                        {alert.link ? <Button as={'a'} href={alert.source.includes('Loop') ? alert.origin + alert.link : alert.link} target={'_blank'} variant={'ghost'} colorScheme={'green'}>Learn More</Button> : <></>}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
