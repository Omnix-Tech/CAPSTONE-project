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
        <Modal size={'lg'} isOpen={isOpen} onClose={onClose} finalFocusRef={modal} >
            <ModalOverlay bg={'blackAlpha.900'} />
            <ModalContent bgColor={'blackAlpha.800'} backdropFilter={'blur(10px)'}>
                <Box>
                    {image ?
                        <Image w={'full'} src={image} alt='' />
                        :
                        <HStack w={'full'} position={'relative'} justifyContent={'center'} alignItems={'center'}>
                            <Camera ref={camera} aspectRatio={1 / 1} />
                            <Tooltip label={'Center your face within the circle'}>
                                <HStack justifyContent={'center'} position={'absolute'} top={0} bottom={0} width='full'>
                                    <Image src='/images/face-cam.png' />
                                </HStack>
                            </Tooltip>
                        </HStack>
                    }
                </Box>


                <HStack p={10} spacing={10} justifyContent={'center'} alignItems={'center'} >
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

                            <IconButton colorScheme={'whiteAlpha'} variant={'ghost'} onClick={onClose} borderRadius={'full'} icon={<FeatherIcon size={24} icon={'x'} />} />

                            {camera.current ?
                                camera.current.getNumberOfCameras() > 1 ?
                                    <Tooltip label={'Flip Camera'} >
                                        <IconButton colorScheme={'whiteAlpha'} variant={'ghost'} onClick={() => camera.current.switchCamera()} icon={<FeatherIcon size={20} icon={'repeat'} />} />
                                    </Tooltip>
                                    :
                                    <></>
                                :
                                <></>}



                        </>
                    }


                </HStack>

            </ModalContent>
        </Modal>
    )


    return { onOpen, onClose, modal, image, render, setImage }
}


export default useCamera