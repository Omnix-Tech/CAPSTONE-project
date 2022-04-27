import React from 'react'
import { Alert, Center, AlertIcon, CloseButton, Box, AlertTitle, AlertDescription, Spinner } from '@chakra-ui/react'

const useFeedback = () => {

    const [isOpen, setIsOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [heading, setHeading] = React.useState('')
    const [status, setStatus] = React.useState('info')


    const handleOpenAlert = ({ heading, message, status, isLoading }) => {
        setIsOpen(true)
        if (isLoading) {
            setIsLoading(true)
            return;
        }

        setIsLoading(false)
        message ? setMessage(message) : setMessage('')
        heading ? setHeading(heading) : setHeading('')
        status ? setStatus(status) : setStatus('info')
    }


    const showSuccess = ({ message, heading }) => {
        handleOpenAlert({ heading, message, status: 'success' })
    }


    const showError = ({ message, heading }) => {
        handleOpenAlert({ heading, message, status: 'error' })
    }


    const onClose = () => setIsOpen(false)


    const render = () => (
        <>
            <Alert zIndex={'toast'} status={status} display={isOpen ? 'flex' : 'none'} borderRadius={30} position={'fixed'} width={350} bottom={{ base: 90, md: 10 }} right={{ base: 10, md: 90 }} >

                {isLoading ?
                    <Center width={'full'}><Spinner /></Center>
                    :
                    <>
                        <AlertIcon />
                        <Box>
                            {heading === '' ? <></> : <AlertTitle>{heading}</AlertTitle>}
                            {message === '' ? <></> : <AlertDescription>{message}</AlertDescription>}
                        </Box>
                        <CloseButton borderRadius={'full'} onClick={onClose} position='absolute' right='8px' top='8px' />
                    </>}


            </Alert></>
    )


    const loading = () => {
        handleOpenAlert({ status: 'info', isLoading: true })
    }

    return {
        isOpen,
        onClose,
        isLoading,
        message,
        status,
        heading,
        handleOpenAlert,
        showError,
        showSuccess,
        render,
        loading
    }
}


export default useFeedback