import { HStack, Image, Button, Tooltip, IconButton, Text, Box, GridItem } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'
import { useEffect, useState, useRef } from 'react';
import useCamera from './useCamara';

const blazeface = require('@tensorflow-models/blazeface')

const useUserPhotoValidation = () => {
    const { render: cameraRender, onOpen, image: photo, setImage: setPhoto } = useCamera()

    const [model, setModel] = useState()
    const [isValidating, setIsValidating] = useState(false)
    const [validated, setIsValidated] = useState(null)

    const [errors, setErrors] = useState([])

    const photoRef = useRef()
    const canvasRef = useRef()


    const initializeModel = () => {
        blazeface.load()
            .then(model => setModel(model))
            .catch(err => setErrors([err.message]))
    }


    const validateImage = () => {
        const photo = photoRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        setIsValidating(true)
        model.estimateFaces(photo, false)
            .then(predictions => {
                if (predictions.length > 0) {
                    canvas.width = photo.width
                    canvas.height = photo.height
                    ctx.drawImage(photo, 0, 0, photo.width, photo.height)

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
                    setErrors(['Invalid Photo'])
                    setIsValidated(false)
                }

                setIsValidating(false)
            })
            .catch(err => setErrors([err.message]))
    }



    const render = () => (
        <GridItem colSpan={{base:12, md:6}} >
            <Box p={2}>
            {cameraRender()}
            {photo ?
                <>
                    <canvas ref={canvasRef} style={{ display: validated ? 'unset' : 'none' }} />
                    <Image ref={photoRef} src={photo} alt='' display={validated ? 'none' : 'unset'} />

                    <HStack py={5} justifyContent={'center'} >
                        <Button
                            onClick={validateImage}
                            isLoading={isValidating}
                            disabled={(!(model && photoRef)) | validated}
                            colorScheme={'blackAlpha'}
                        >
                            {validated ? <FeatherIcon icon={'check'} /> : validated === null ? 'Validate Photo' : <FeatherIcon icon={'x'} />}
                        </Button>
                        <Tooltip label={'Delete Photo'} >
                            <IconButton borderRadius={'full'} colorScheme={'red'} onClick={() => setPhoto(null)} icon={<FeatherIcon icon={'trash'} />} />
                        </Tooltip>
                    </HStack>

                    <Text fontSize={'xs'} color={'red'} >
                        {errors.map(error => error)}
                    </Text>
                </>
                :

                <>
                    <HStack onClick={onOpen} cursor={'pointer'} alignItems={'center'} justifyContent={'center'} border={'dashed'} borderColor={'blackAlpha.300'} p={5} >
                        <FeatherIcon icon={'camera'} />
                    </HStack>
                </>}

            </Box>
        </GridItem>
    )




    useEffect(() => {
        if (photo) {
            initializeModel()
        } else {
            setModel(null)
            setIsValidated(null)
            setErrors([])
        }

    }, [photo])



    return { validated, render, photo }





}

export default useUserPhotoValidation
