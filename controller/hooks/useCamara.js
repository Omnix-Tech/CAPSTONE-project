import React, { useRef, useState, useEffect } from 'react'

import { Box, HStack, IconButton, Modal, ModalContent, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'


const useCamera = () => {
    const [hasPhoto, setHasPhoto] = useState(false)
    const [currentPhoto, setCurrentPhoto] = useState(null)


    const { isOpen, onClose, onOpen } = useDisclosure()


    const modalRef = useRef()
    const cameraRef = useRef(null)
    const photoRef = useRef(null)


    const startCamera = () => {
        isOpen ? null : onOpen()
        navigator.mediaDevices.getUserMedia({
            video: {
                width: 1080,
                height: 1920
            }
        })
            .then(stream => {
                const camera = cameraRef.current
                camera.srcObject = stream
                camera.play()
            })
            .catch(err => console.error(err))
    }

    const retakePhoto = () => {
        setHasPhoto(false)
        setCurrentPhoto(null)
    }

    const takePhoto = () => {
        const width = 420
        const height = width / (4 / 4)

        const camera = cameraRef.current
        const photo = photoRef.current

        photo.width = width
        photo.height = height

        const context = photo.getContext('2d')
        context.drawImage(camera, 0, 0, width, height)
        // setCurrentPhoto(photoRef)
        setHasPhoto(true)
    }


    useEffect(() => {
        if (isOpen) startCamera()
    }, [cameraRef])



    const render = () => (
        <Modal size={'xl'} isOpen={isOpen} onClose={onClose} finalFocusRef={modalRef}>
            <ModalOverlay />
            <ModalContent>
                <Box position={'relative'} >
                <video ref={cameraRef} style={{ width: '100%', height: 'auto', display: hasPhoto ? 'none' : 'unset' }} />
                <canvas ref={photoRef} style={{ width: '100%', height: 'auto', display: hasPhoto ? 'unset' : 'none' }} />
                    
                    <Box position={'absolute'} bottom={5} left={5} right={5}>
                        {hasPhoto ?
                            <HStack justifyContent={'space-between'} >
                                <IconButton size={'lg'} borderRadius={'full'} colorScheme={'whiteAlpha'} onClick={retakePhoto} icon={<FeatherIcon icon={'arrow-left-circle'} />} />
                                <IconButton size={'lg'} borderRadius={'full'} colorScheme={'whiteAlpha'} onClick={onClose} icon={<FeatherIcon icon={'check-circle'} />} />
                            </HStack>
                            :
                            <HStack justifyContent={'space-between'} >
                                <IconButton size={'lg'} borderRadius={'full'} colorScheme={'whiteAlpha'} onClick={onClose} icon={<FeatherIcon icon={'x-circle'} />} />
                                <IconButton size={'lg'} borderRadius={'full'} colorScheme={'whiteAlpha'} onClick={takePhoto} icon={<FeatherIcon icon={'camera'} />} />
                            </HStack>
                        }
                    </Box>
                </Box>
            </ModalContent>
        </Modal>
    )




    return { render, startCamera, currentPhoto, hasPhoto, photoRef }
}


export default useCamera