import React from 'react';
import { signInWithCustomToken } from '../../app/auth/auth.client';
import { Heading, VStack, Box, Button, HStack, Image, Center, SimpleGrid, Text, Spinner } from '@chakra-ui/react';


import { useRouter } from 'next/dist/client/router';
import useRequestHandlers from '../../controller/handlers';
import useFeedback from '../../controller/hooks/useFeedback';
import AuthLayout from '../../components/layout/auth.layout';



function SelectLocation({ locations, setlocationId, locationId }) {
    return (
        <Box paddingX={{ base: 5, md: 40 }}>
            <Box>
                <Heading size={'lg'} color={'yellow.400'} >We Connect Setup</Heading>
                <Heading size={'md'} color={'white'} >Select your community</Heading>
            </Box>

            <SimpleGrid mt={5} padding={2} minChildWidth={100} spacing={5}>

                {locations.map(location => (
                    <Box
                        key={location.place_id}
                        _hover={{ opacity: '0.8', cursor: 'pointer' }}
                        p={2}
                        bg={location.place_id === locationId ? 'yellow.400' : 'white'}
                        borderRadius={5}
                        onClick={() => setlocationId(location.place_id)} >

                        <Text fontSize={'x-small'} textTransform={'uppercase'} fontWeight={'medium'} color={'black'} >{location.area}</Text>

                    </Box>
                ))}

            </SimpleGrid>
        </Box>
    )
}


function Complete({ locationId, uid, setCurrentStep, setIsDone, isDone, showError, showSuccess }) {
    const [isLoading, setIsLoading] = React.useState(true)
    const { Post } = useRequestHandlers()

    const handleSetUserLocation = async () => {
        Post(`api/location/${locationId}`, { uid })
            .then(res => {
                showSuccess({ message: 'Completed' })
                setIsDone(true)
                setIsLoading(false)
            })
            .catch(error => {
                showError({ message: error.message })
                setCurrentStep(1)
            })

    }


    React.useEffect(() => {
        if (!isDone) handleSetUserLocation()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Box paddingX={{ base: 5, md: 40 }}>

            {isLoading ?
                <Center p={10}>
                    <Spinner />
                </Center>
                :
                <>
                    <Heading color={'white'} textAlign={'center'} p={10} size={'xl'} >Successfully Connected</Heading>
                    <Text textAlign={'center'} color={'whiteAlpha.700'} fontWeight={'medium'}>Continue to Verification</Text>
                    <Center padding={5}>
                        <Image alt='' src='/images/img_2.png' w={'65%'} />
                    </Center>
                </>
            }

        </Box>
    )
}


export default function Setup({ user, locations }) {
    const { showError, showSuccess, render } = useFeedback()


    const router = useRouter()
    const { token } = router.query
    const [currentStep, setCurrentStep] = React.useState(0)
    const [isDone, setIsDone] = React.useState(false)

    const [locationId, setlocationId] = React.useState(null)

    const handleInitialization = async () => {
        await signInWithCustomToken(token)
            .catch(error => {
                console.log(error)
                router.replace('/')
            })
    }

    React.useEffect(() => {
        handleInitialization()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            {render()}
            <AuthLayout>
                <VStack spacing={30} paddingY={10} h={'100vh'} justifyContent={'center'}>

                    {currentStep === 0 ? <SelectLocation locations={locations} setlocationId={setlocationId} locationId={locationId} /> : <></>}
                    {currentStep === 1 ? <Complete showError={showError} showSuccess={showSuccess} isDone={isDone} setIsDone={setIsDone} uid={user?.uid} locationId={locationId} setCurrentStep={setCurrentStep} /> : <></>}

                    <Box w={'60%'} pt={5}>
                        {currentStep === 0 ?
                            <HStack spacing={5} mt={30} alignItems={'center'} >
                                <Button disabled={locationId === null} onClick={() => setCurrentStep(1)} mt={30} width={'full'} borderRadius={'full'} size={'lg'}>
                                    Select Connect
                                </Button>
                            </HStack>
                            : <></>
                        }


                        {currentStep === 1 ?
                            <HStack spacing={5} mt={30} alignItems={'center'} >
                                <Button onClick={() => router.replace('/verify')} width={'full'} borderRadius={'full'} size={'lg'}>
                                    Get Verified
                                </Button>
                            </HStack>

                            : <></>
                        }
                    </Box>
                </VStack>
            </AuthLayout>
        </>

    );
}


