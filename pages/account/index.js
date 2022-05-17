
import Layout from "../../components/layout"

import React from 'react'
import { FormLabel, HStack, Avatar, Heading, Text, Grid, GridItem, Input, Divider, Box, Button, IconButton, Tooltip, useDisclosure, Modal, ModalOverlay, ModalBody, ModalContent, ModalFooter } from '@chakra-ui/react'

import FeatherIcon from 'feather-icons-react'

import ConnectMenu from '../../components/ConnectMenu'
import useConnect from "../../controller/hooks/useConnect"
import UserForums from "../../components/Forum/Listing/UserForums"
import Forums from "../../components/Forum/Listing/Forums"
import { Post } from "../../controller/handlers"
import useFeedback from "../../controller/hooks/useFeedback"



function ChangePassword({ user, showError, showSuccess }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalRef = React.useRef()

    const [password, setPassword] = React.useState('')

    const handleChangePassword = () => {
        Post(`/api/account/password/${user?.uid}`, { password: password })
            .then(data => {
                showSuccess({ message: 'Password Changed' })
                onClose()
                setPassword('')
            })
            .catch(err => {
                console.log(err)
                showError({ message: 'Failed' })
            })
    }

    const handleCancel = () => {
        setPassword('')
        onClose()
    }

    return (
        <>
            <Button onClick={onOpen} ref={modalRef} size={'sm'} my={2} colorScheme={'linkedin'} variant={'ghost'} isFullWidth >Change Password</Button>
            <Modal isOpen={isOpen} finalFocusRef={modalRef} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                        <FormLabel>New Password</FormLabel>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} isFullWidth type={'password'} />
                    </ModalBody>

                    <ModalFooter>
                        <HStack>
                            <Button onClick={handleCancel} >Cancel</Button>
                            <Button onClick={handleChangePassword} >Change Password</Button>
                        </HStack>

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}



export default function Account({ user }) {
    const { connectDocument: connect, handleSetConnect, connectDocs } = useConnect(user)

    const [email, setEmail] = React.useState(user?.email)
    const [readable, setReadable] = React.useState(true)
    const [isChanging, setIsChanging] = React.useState(false)

    const { showError, showSuccess, render } = useFeedback()


    const handleCancelEmailEdit = () => {
        setEmail(user?.email)
        setReadable(true)
    }

    const handleChangeEmail = () => {
        setReadable(false)
        setIsChanging(true)

        Post(`/api/account/email/${user?.uid}`, { email: email })
            .then(data => {
                showSuccess({ message: 'Email Changed' })
                setIsChanging(false)
                setReadable(true)
            })
            .catch(err => {
                showError({ message: "Failed to Change Email" })
                setIsChanging(false)
                setReadable(true)
                setEmail(user?.email)
            })
    }

    return (
        <Layout>

            {render()}

            <Grid templateColumns={'repeat(12,1fr)'}>
                <GridItem colSpan={{ base: 12, md: 4 }} >
                    <HStack bg={'blackAlpha.200'} py={10} justifyContent={'center'} flexDirection={'column'} >
                        <Avatar my={3} size={'2xl'} />
                        <Heading size={'lg'} >{user?.displayName}</Heading>
                        <HStack alignItems={'center'} >
                            <Input size={'sm'} variant={readable ? 'unstyled' : 'filled'} value={email} onChange={(e) => setEmail(e.target.value)} isReadOnly={readable} />
                            <Tooltip label={'Change Email Address'}>
                                <IconButton disabled={!readable && email === user?.email} isLoading={isChanging} onClick={readable ? () => setReadable(!readable) : handleChangeEmail} colorScheme={'green'} variant={'ghost'} borderRadius={'full'} size={'sm'} icon={<FeatherIcon size={14} icon={readable ? 'edit' : 'check'} />} />
                            </Tooltip>
                            <IconButton disabled={readable} onClick={handleCancelEmailEdit} colorScheme={'green'} variant={'ghost'} borderRadius={'full'} size={'sm'} icon={<FeatherIcon size={14} icon={'x'} />} />

                        </HStack>
                    </HStack>


                    <Box px={3}>
                        <ChangePassword user={user} showError={showError} showSuccess={showSuccess} />
                        <Button size={'sm'} my={2} colorScheme={'red'} variant={'ghost'} isFullWidth >Delete Account</Button>
                    </Box>
                </GridItem>

                <GridItem py={5} px={3} colSpan={{ base: 12, md: 8 }} >
                    <Box>
                        <Text fontWeight={'medium'} >Your Forums</Text>
                        <Divider my={2} />
                        <Box p={5} bg={'blackAlpha.200'} borderRadius={5} >
                            <UserForums user={user} location={connect} />
                        </Box>

                    </Box>


                    <Box my={10}>
                        <HStack py={2} alignItems={'center'}>
                            <FeatherIcon size={16} icon={'map-pin'} />
                            <Text fontSize={'sm'} fontWeight={'medium'}>{connect ? connect?.area : ''}</Text>
                            <Text fontSize={'sm'} fontWeight={'medium'}>Select Current Connect</Text>
                            <ConnectMenu connectsDocs={connectDocs} />
                        </HStack>


                        <Box p={5} bg={'blackAlpha.200'} borderRadius={5} >
                            <Forums user={user} location={location} />
                        </Box>

                    </Box>


                </GridItem>
            </Grid>
        </Layout>
    )
}