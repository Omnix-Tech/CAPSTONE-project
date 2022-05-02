import { CloseButton, Modal, ModalBody, Box, Text, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Divider, SkeletonText, Button, Badge } from "@chakra-ui/react";


import { useDocumentData } from 'react-firebase-hooks/firestore'
import useAPIs from "../../../controller/handlers";

function Connects({ connectRef }) {

    const [connect, loading] = useDocumentData(connectRef)

    return (
        <>
            {loading ?
                <SkeletonText w={'full'} />
                : connect ?
                    <>
                        <Text fontSize={'x-small'} fontWeight={'medium'} textTransform={'uppercase'}>{connect.area}</Text>
                    </> : ''}
        </>
    )
}


export default function JoinModal({ isOpen, onClose, modalRef, forum, participants, connects, owner, showError, showSuccess, currentUser }) {
    const { joinForum } = useAPIs()

    const handleJoinForum = () => {
        joinForum({ forum: forum.id, user: currentUser.uid })
            .then(data => {
                if (data.error) {
                    showError({ message: 'Something went wrong' })
                } else {
                    showSuccess({ message: 'Success' })
                    onClose()
                }
            })
    }

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} finalFocusRef={modalRef}>
                <ModalOverlay />

                <ModalContent>


                    <ModalHeader display={'flex'} justifyContent={'space-between'}>
                        <Text>
                            {forum ? `${forum.title}` : ''}
                        </Text>

                        <CloseButton onClick={onClose} />
                    </ModalHeader>


                    <ModalBody>
                        <Box mb={5}>
                            <Text fontWeight={'bold'} fontSize={'sm'}  >Description</Text>
                            <Divider mb={2} />

                            <Text fontSize={'xs'}>{forum ? forum.description === '' ? 'No Description' : forum.description : 'Loading...'}</Text>

                        </Box>

                        <Box>
                            <Text fontWeight={'bold'} fontSize={'sm'}  >Connects</Text>
                            <Divider mb={2} />

                            {connects ? connects.map(connect => (
                                <Connects key={connect.location.id} connectRef={connect.location} />
                            )) : <></>}
                        </Box>

                        {participants && owner ?
                            <>
                                <Box mt={10} display={'flex'} justifyContent={'space-between'}>
                                    <Badge colorScheme={'green'} fontSize={'x-small'}> {participants.length} Participants</Badge>
                                    <Badge colorScheme={'blue'} variant={'outline'} fontSize={'x-small'}>Created by {owner ? `${owner.firstName} ${owner.lastName}` : ''}</Badge>
                                </Box>
                            </>

                            :

                            <></>}

                    </ModalBody>


                    <ModalFooter>
                        <Button onClick={handleJoinForum}>Join</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>


        </>
    )
}