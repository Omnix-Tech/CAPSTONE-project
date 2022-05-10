import React from 'react'
import { Alert, Center, AlertIcon, Box, AlertTitle, AlertDescription, Spinner } from '@chakra-ui/react'

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

        setTimeout(() => {
            setIsOpen(false)
        }, 3000)
    }


    const showSuccess = ({ message, heading }) => {
        handleOpenAlert({ heading, message, status: 'success' })
    }


    const showError = ({ message, heading }) => {
        handleOpenAlert({ heading, message, status: 'error' })
    }





    const render = () => (
        <>
            <Alert zIndex={'popover'} status={status} display={isOpen ? 'flex' : 'none'} borderRadius={2} position={'fixed'} width={'45vw'} bottom={{ base: 90, md: 10 }} right={{ base: 10, md: 90 }} >

                {isLoading ?
                    <Center width={'full'}><Spinner /></Center>
                    :
                    <>
                        <AlertIcon />
                        <Box>
                            {heading === '' ? <></> : <AlertTitle fontSize={'sm'}>{heading}</AlertTitle>}
                            {message === '' ? <></> : <AlertDescription fontSize={'sm'}>{message}</AlertDescription>}
                        </Box>
                    </>}
            </Alert>
        </>
    )


    const loading = () => {
        handleOpenAlert({ status: 'info', isLoading: true })
    }

    return {
        isOpen,
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