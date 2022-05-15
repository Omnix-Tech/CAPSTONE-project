import { Image, Box, HStack, IconButton, Modal, ModalContent, ModalOverlay, useDisclosure, Tooltip } from '@chakra-ui/react';
import { useRef, useState } from 'react'
import { Camera } from 'react-camera-pro';


import FeatherIcon from 'feather-icons-react'





const useCamera = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const modal = useRef()

    const camera = useRef(null)
    const [image, setImage] = useState(null)

    const render = () => (
        <Modal size={'full'} isOpen={isOpen} onClose={onClose} finalFocusRef={modal} >
            <ModalOverlay />
            <ModalContent bgColor={'blackAlpha.500'} backdropFilter={'blur(10px)'} position={'relative'}>
                {image ?
                    <Image src={image} alt='' />
                    :
                    <Box h={'80vh'} position={'relative'}>
                        <Camera ref={camera} />
                        <Tooltip label={'Center your face within the circle'}>
                        <HStack justifyContent={'center'} position={'absolute'} top={0} bottom={0} width='full'>
                            <Image src='/images/face-cam.png' />
                        </HStack>

                        </Tooltip>
                    </Box>
                }
                <HStack spacing={10} position={'absolute'} bottom={10} left={0} right={0} justifyContent={'center'}>
                    {image ?
                        <>
                            <IconButton
                                p={10}
                                colorScheme={'green'}
                                borderRadius={'full'}
                                onClick={onClose}
                                icon={<FeatherIcon icon={'check'} />} />

                            <IconButton variant={'ghost'} colorScheme={'whiteAlpha'} onClick={() => setImage(null)} borderRadius={'full'} icon={<FeatherIcon icon={'x'} />} />
                        </>
                        :
                        <>
                            <IconButton
                                p={10}
                                borderRadius={'full'}
                                colorScheme={'whiteAlpha'}
                                onClick={() => setImage(camera.current.takePhoto())}
                                icon={<FeatherIcon icon={'camera'} />} />

                            <IconButton colorScheme={'whiteAlpha'} variant={'ghost'} onClick={onClose} borderRadius={'full'} icon={<FeatherIcon icon={'x'} />} />
                        </>
                    }


                </HStack>

            </ModalContent>
        </Modal>
    )


    return { onOpen, onClose, modal, image, render, setImage }
}


export default useCamera