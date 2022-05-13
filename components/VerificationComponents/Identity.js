import { Button, HStack, Text, Box, Image, Grid, GridItem, Input, FormLabel, Spinner, Center } from "@chakra-ui/react";

import FeatherIcon from 'feather-icons-react'
import useCamera from "../../controller/hooks/useCamara";


export default function NameVerification({ setStep, user, connect }) {

    const { render, startCamera, photoRef } = useCamera()

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
                                        <FormLabel>Upload Photo ID</FormLabel>
                                        <Input type={'file'} />
                                    </Box>

                                    <Box mt={10}>
                                        <FormLabel>Take Clear Face Photo</FormLabel>
                                        <Button onClick={startCamera} cursor={'pointer'} colorScheme={'blackAlpha'} variant={'ghost'}>
                                            <HStack>
                                                <FeatherIcon icon={'camera'} />
                                                <FormLabel>Camera</FormLabel>
                                            </HStack>
                                        </Button>
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