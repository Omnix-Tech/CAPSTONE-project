import { Box, FormLabel, HStack, Image, Input, Progress, Tooltip, IconButton, Text } from '@chakra-ui/react'

import FeatherIcon from 'feather-icons-react'

import { useState, useEffect, useRef } from 'react'


const search = (name, content) => {
    const names = name.split(' ')

    const results = names.map(name => {
        name = name.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        return content.search(name) !== -1
    })

    return results.includes(true)
}

const T = require('tesseract.js')
const blazeface = require('@tensorflow-models/blazeface')

const usePhotoIDValidation = (name) => {

    const [file, setFile] = useState()
    const [fileSrc, setFileSrc] = useState()

    const [isValidating, setIsValidating] = useState(false)
    const [isOwned, setIsOwned] = useState(false)
    const [validated, setValidated] = useState(null)


    const [imageContent, setImageContent] = useState()
    const [contentProgress, setContentProgress] = useState(0)


    const [model, setModel] = useState()

    const canvasRef = useRef()
    const photoRef = useRef()

    const clearPhoto = () => {
        setFile(null)
        setFileSrc(null)
        setIsValidating(false)
        setIsOwned(false)
        setValidated(null)
        setImageContent(null)
        setContentProgress(0)
        setModel()
    }


    const initializeModel = () => {
        blazeface.load()
            .then(model => setModel(model))
            .catch(err => console.log(err))
    }




    const [error, setError] = useState('')


    const initiatePhotoID = (e) => {
        const reader = new FileReader()
        const files = e.target.files

        if (files.lenght === 0) return
        setFile(files[0])
        reader.readAsDataURL(files[0])

        reader.onload = function () {
            const src = reader.result
            console.log(src)
            setFileSrc(src)
        }
    }

    const handleRetrieve = () => {
        T.recognize(fileSrc, 'eng', { logger: e => setContentProgress(e.progress) })
            .then(out => {
                setImageContent(out.data.text.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, ""))
            })
            .catch(err => setError(err.message))
    }

    const detectFace = () => {
        const photo = photoRef.current
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        setIsValidating(true)
        model.estimateFaces(photo, false)
            .then(predictions => {
                if (predictions.length === 1) {
                    const pred = predictions[0]
                    canvas.width = photo.width
                    canvas.height = photo.height
                    ctx.drawImage(photo, 0, 0, photo.width, photo.height)

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


                    setValidated(true)
                } else {
                    setValidated(false)
                }
                setIsValidating(false)
            })
            .catch(err => {
                setValidated(false)
                setIsValidating(false)
                console.log(err)
            })
    }


    const render = () => {
        return (
            <>
                <FormLabel>{file ? 'Uploaded' : 'Upload'} Photo ID</FormLabel>
                {file ?
                    <Box position={'relative'}>
                        <canvas ref={canvasRef} style={{ display: validated ? 'unset' : 'none', width: '100%' }} />
                        <Image w={'100%'} ref={photoRef} src={fileSrc} alt={''} display={validated ? 'none' : 'unset'} />


                        <HStack top={0} p={2} position={'absolute'} justifyContent={'end'}>
                            <Tooltip label={'Delete Photo'} >
                                <IconButton borderRadius={'full'} colorScheme={'red'} onClick={clearPhoto} icon={<FeatherIcon icon={'trash'} />} />
                            </Tooltip>
                        </HStack>
                        {imageContent ? <>{
                            isOwned ?
                                <>{
                                    isValidating ? <Progress isIndeterminate />
                                        :
                                        <>
                                            {validated ?
                                                <HStack justifyContent={'center'} alignItems={'center'}>
                                                    <FeatherIcon icon={'check'} />
                                                    <Text fontWeight={'medium'} fontSize={'sm'} color={'green'} >Valid</Text>
                                                </HStack>
                                                :
                                                validated === null ?
                                                    <Progress isIndeterminate />
                                                    :
                                                    <HStack justifyContent={'center'} alignItems={'center'}>
                                                        <FeatherIcon icon={'x'} />
                                                        <Text fontWeight={'medium'} fontSize={'sm'} color={'red'} >Invalid - No Face Detected</Text>
                                                    </HStack>

                                            }
                                        </>
                                }</> :
                                <HStack justifyContent={'center'} alignItems={'center'}>
                                    <FeatherIcon icon={'x'} />
                                    <Text fontWeight={'medium'} fontSize={'sm'} color={'red'} >{'Please upload a valid photo ID, name does NOT match registered name'}</Text>
                                </HStack>
                        }</>
                            :
                            <Progress value={contentProgress * 100} />}
                    </Box>
                    :
                    <Input accept="image/*" onChange={initiatePhotoID} type={'file'} />
                }

            </>
        )
    }



    useEffect(() => {
        if (fileSrc) handleRetrieve()
    }, [fileSrc])

    useEffect(() => {
        if (imageContent) {
            setIsOwned(search(name, imageContent))
        }
    }, [imageContent])


    useEffect(() => {
        if (isOwned) initializeModel()
    }, [isOwned])


    useEffect(() => {
        if (model) detectFace()
    }, [model])


    return { render, validated, file, fileSrc }
}


export default usePhotoIDValidation