import { Button, HStack, Text, Box, Image, Grid, GridItem, Input, FormLabel, Spinner, Center, Tooltip, IconButton } from "@chakra-ui/react";

import { useState, useEffect, useRef } from 'react'

import FeatherIcon from 'feather-icons-react'
import useCamera from "../../controller/hooks/useCamara";


const blazeface = require('@tensorflow-models/blazeface')

export default function NameVerification({ setStep, user, connect }) {

    const { render, onOpen, image, setImage } = useCamera()
    const [photoID, setPhotoID] = useState(null)
    const [model, setModel] = useState(null)


    const [isValidating, setIsValidating] = useState(false)
    const [validated, setIsValidated] = useState(null)


    const photoReference = useRef(null)
    const canvasReference = useRef(null)

    const handleSetModel = () => {
        blazeface.load().then(model => setModel(model)).catch(err => console.log(err))
    }


    const detectFaces = () => {
        const photo = photoReference.current
        const canvas = canvasReference.current
        const ctx = canvas.getContext("2d")

        setIsValidating(true)
        model.estimateFaces(photo, false)
            .then(predictions => {

                if (predictions.length > 0) {
                    canvas.width = photo.width
                    canvas.height = photo.height
                    ctx.drawImage(photo, 0, 0, canvas.width, canvas.height)
                    predictions.forEach(pred => {
                        ctx.beginPath()
                        ctx.lineWidth = "4"
                        ctx.strokeStyle = "green"

                        ctx.rect(
                            pred.topLeft[0],
                            pred.topLeft[1],
                            pred.bottomRight[0] - pred.topLeft[0],
                            pred.bottomRight[1] - pred.topLeft[1]
                        )

                        ctx.stroke()
                    })


                    
                    setIsValidated(true)
                } else {
                    alert('Invalid Photo')
                    setIsValidated(false)
                }
                setIsValidating(false)

            })
            .catch(err => {
                console.log(err)
                setIsValidating(false)
            })
    }


    const handlePhotoUpload = (e) => {
        const files = e.target.files
        if (files.length === 0) return
        const src = URL.createObjectURL(files[0])
        setPhotoID(src)
    }


    useEffect(() => {
        if (image) {
            handleSetModel()
        } else {
            setModel(model)
            setIsValidated(null)
            if (canvasReference.current) {
                const ctx = canvasReference.current.getContext("2d")
                ctx.clearRect(0,0,0,0)
            }
        }
    }, [image])

    console.log(model, photoReference)

    return (
        <>
            {render()}
            <Box>
                <Text fontSize={'3xl'} fontWeight={'bold'}>Identity Verification</Text>
                <Text mt={5} color={'black'} fontSize={'xl'} fontWeight={'medium'} >Please Upload a Photo ID to verify your identity. Please ensure the image is clear.</Text>


                <Grid my={10} templateColumns={'repeat(12,1fr)'} >
                    <GridItem colSpan={{ base: 12, md: 4 }} >
                        <HStack w={'full'} justifyContent={'center'} >
                            <Image width={{ base: '60%', md: '100%' }} src='/images/photoid.png' />
                        </HStack>
                    </GridItem>
                    <GridItem colSpan={{ base: 12, md: 8 }} >
                        <Box px={10} mt={{ base: 10, md: 0 }}>
                            <Box mb={10}>
                                <HStack>
                                    <Text>Name:</Text>
                                    <Text fontWeight={'medium'}>{user ? user.displayName : ""}</Text>
                                </HStack>
                                <HStack>
                                    <Text>Location:</Text>
                                    <Text fontWeight={'medium'}>{connect ? `${connect.area}, ${connect.parish}` : ""}</Text>
                                </HStack>
                            </Box>
                            {true ?
                                <>
                                    <Box>
                                        <FormLabel>{photoID ? 'Uploaded' : 'Upload'} Photo ID</FormLabel>
                                        {photoID ?
                                            <Box position={'relative'}>
                                                <Image my={5} src={photoID} alt='' />
                                                <HStack top={0} p={2} position={'absolute'} justifyContent={'end'}>
                                                    <Tooltip label={'Delete Photo'} >
                                                        <IconButton borderRadius={'full'} colorScheme={'red'} onClick={() => setPhotoID(null)} icon={<FeatherIcon icon={'trash'} />} />
                                                    </Tooltip>
                                                </HStack>
                                            </Box>
                                            :
                                            <>
                                                <Input accept="image/*" onChange={handlePhotoUpload} type={'file'} />
                                            </>}

                                    </Box>

                                    <Box mt={10}>
                                        {image ?
                                            <>
                                                <canvas ref={canvasReference} />
                                                <Image ref={photoReference} src={image} alt='' display={validated ? 'none' : 'unset'} />

                                                <HStack py={5} justifyContent={'center'} >
                                                    <Button onClick={detectFaces} isLoading={isValidating} disabled={(!(model && photoReference)) | validated} colorScheme={'blackAlpha'}>{ validated ? <FeatherIcon icon={'check'} /> : validated === null ? 'Validate Photo' : <FeatherIcon icon={'x'} /> }</Button>
                                                    <Tooltip label={'Delete Photo'} >
                                                        <IconButton borderRadius={'full'} colorScheme={'red'} onClick={() => setImage(null)} icon={<FeatherIcon icon={'trash'} />} />
                                                    </Tooltip>
                                                </HStack>



                                            </>

                                            :
                                            <>
                                                <FormLabel>Take Clear Face Photo</FormLabel>
                                                <Button onClick={onOpen} cursor={'pointer'} colorScheme={'green'} variant={'ghost'}>
                                                    <FeatherIcon icon={'camera'} />
                                                    <Text pl={5}>Camera</Text>
                                                </Button>
                                            </>
                                        }

                                    </Box>




                                    <Button mt={10} mb={3} w={'full'} variant={'ghost'} colorScheme={'green'} >Verify Identity</Button>




                                    <Box mt={10}>
                                        <Text textTransform={'uppercase'} fontWeight={'medium'} textAlign={'center'} color={'red'} >Please provide a clear photo</Text>
                                        <Text textTransform={'uppercase'} fontWeight={'medium'} textAlign={'center'} color={'green'} >Identity Verified</Text>
                                    </Box>
                                </>

                                :
                                <Center p={20}>
                                    <Spinner />
                                </Center>
                            }

                        </Box>
                    </GridItem>
                </Grid>

                <HStack mt={30} justifyContent={'space-between'}>
                    <Button onClick={() => setStep(0)} colorScheme={'blackAlpha'} variant={'ghost'} >
                        <HStack alignItems={'center'}>
                            <FeatherIcon icon={'arrow-left-circle'} />
                            <Text fontWeight={'medium'}>Back</Text>
                        </HStack>
                    </Button>
                    <Button onClick={() => setStep(2)} colorScheme={'blackAlpha'} variant={'ghost'} >
                        <HStack alignItems={'center'}>
                            <Text fontWeight={'medium'}>Next</Text>
                            <FeatherIcon icon={'arrow-right-circle'} />
                        </HStack>
                    </Button>
                </HStack>
            </Box>
        </>
    )
}