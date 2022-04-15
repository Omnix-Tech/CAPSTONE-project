import React from 'react'


const useAlert = () => {

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


    const onClose = () => setIsOpen(false)
    
    return {
        isOpen,
        onClose,
        isLoading,
        message,
        status, 
        heading,
        handleOpenAlert
    }
}


export default useAlert