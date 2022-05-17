import { Button, HStack, Text, Box, Image, Grid, GridItem, FormLabel } from "@chakra-ui/react";

import { useState } from 'react'

import FeatherIcon from 'feather-icons-react'
import useUserPhotoValidation from "../../controller/hooks/useUserPhotoValidation";
import usePhotoIDValidation from "../../controller/hooks/usePhotoIDValidation";


const recognize = require("../../utils/verification/face-identify").handler


export default function IdentityVerification({ setStep, user, connect }) {
    const { validated: photo1Validated, render: photo1Render, photo: photo1 } = useUserPhotoValidation()
    const { validated: photo2Validated, render: photo2Render, photo: photo2 } = useUserPhotoValidation()

    const [isLoading, setIsLoading] = useState(false)
    const [isVerified, setIsVerified] = useState(false)

    const [errorMessage, setErrorMessage] = useState('')


    const { render: photoIDValidation, validated: photoIDValidated, finalImage, fileSrc } = usePhotoIDValidation(user?.displayName ? user.displayName : '')


    const handlePhotoIdentification = () => {
        setIsLoading(true)

        const sample1 = document.createElement('img')
        const sample2 = document.createElement('img')
        const photoId = document.createElement('img')

        sample1.src = photo1
        sample2.src = photo2
        photoId.src = finalImage

        console.log(finalImage)


        recognize([sample1, sample2], photoId)
            .then(data => {
                console.log(data)
                setIsLoading(false)
                setIsVerified(true)
            })
            .catch(err => {
                setIsLoading(false)
                setErrorMessage(err.message)
            })


    }


    return (
        <>
            <Box>
                <Text fontSize={'3xl'} fontWeight={'bold'}>Identity Verification</Text>
                <Text mt={5} color={'black'} fontSize={'xl'} fontWeight={'medium'} >
                    To verify your identity, you are required to provide and {`(jpg/png)`} copy of a
                    photo ID and to take clear pictures of yourself, clearly showing your facial features.
                </Text>


                <Grid my={10} templateColumns={'repeat(12,1fr)'} >
                    <GridItem colSpan={{ base: 12, md: 4 }} >
                        <HStack w={'full'} justifyContent={'center'} >
                            <Image alt="" width={{ base: '60%', md: '100%' }} src='/images/photoid.png' />
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
                            <>
                                <Box>
                                    {photoIDValidation()}
                                </Box>

                                <FormLabel mt={5}>Take two (2) photos clearly demonstrating your facial features.</FormLabel>
                                <Grid mt={10} templateColumns={'repeat(12,1fr)'}>
                                    {photo1Render()}
                                    {photo2Render()}
                                </Grid>




                                <Button
                                    isLoading={isLoading}
                                    onClick={handlePhotoIdentification}
                                    disabled={!(photo1Validated && photo2Validated && photoIDValidated)}
                                    mt={10}
                                    mb={3}
                                    w={'full'}
                                    variant={'ghost'}
                                    colorScheme={'green'} >Verify Identity</Button>
                                <Box mt={10}>
                                    {isVerified ?
                                        <Text textTransform={'uppercase'} fontWeight={'medium'} textAlign={'center'} color={'green'} >Identity Verified</Text>
                                        :
                                        <Text textTransform={'uppercase'} fontWeight={'medium'} textAlign={'center'} color={'red'} >{errorMessage}</Text>
                                    }


                                </Box>
                            </>

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
                    {/*disabled={!isVerified}} */}
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