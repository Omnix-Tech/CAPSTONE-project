import React from 'react';
import { signInWithCustomToken } from '../../app/auth/auth.client';
import { Grid, GridItem, Heading, VStack, Input, Box, Button, HStack, Image, Center, SimpleGrid, Text, Spinner } from '@chakra-ui/react';


import { useRouter } from 'next/dist/client/router';
import useRequestHandlers from '../../controller/handlers';
import useFeedback from '../../controller/hooks/useFeedback';



const MainContainerStyle = {
    bg: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(10px)',
    margin: { base: 0, lg: 0 },
    borderLeftRadius: 0,
    borderRightRadius: { base: 0, lg: 30 },
    colSpan: { base: 12, lg: 7 }
}


function CommunityNameComponent({ community, setCommunity }) {
    return (
        <Box paddingX={{ base: 5, md: 40 }}>
            <Heading size={'xl'} color={'yellow.500'} >We Connect Setup</Heading>

            <Heading size={'lg'} color={'white'} >Where are you from?</Heading>
            <Box w={'90%'} pt={10}>
                <Box w={'full'} my={2}>
                    <Input
                        size={'lg'}
                        onChange={(e) => setCommunity(e.target.value)}
                        value={community}
                        variant={'flushed'}
                        placeholder={'Community Name'}
                        textColor={'white'} />
                </Box>
            </Box>
        </Box>
    )
}


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


function Complete({ locationId, community, uid, setCurrentStep, setIsDone, isDone, showError, showSuccess, loading }) {
    const [isLoading, setIsLoading] = React.useState(true)
    const { Post } = useRequestHandlers()

    const handleSetUserLocation = async () => {
        loading()
        Post(`api/location/${locationId}`, { uid, community })
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
                    <Heading color={'white'} textAlign={'center'} p={10} size={'xl'} >All Done!</Heading>
                    <Center padding={5}>
                        <Image alt='' src='/images/img_2.png' w={'65%'} />
                    </Center>
                </>
            }

        </Box>
    )
}


export default function Setup({ user, locations }) {
    const { showError, showSuccess, render, loading } = useFeedback()


    const router = useRouter()
    const { token } = router.query
    const [currentStep, setCurrentStep] = React.useState(0)
    const [community, setCommunity] = React.useState('')
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
        { render() }
            <Box bgRepeat={'no-repeat !important'} bgPosition={'unset'} bgSize={'cover !important'} bg={`url('/images/bg.jpg')`} >
                <Grid bgColor={'rgba(0,0,0,0.2)'} templateColumns={'repeat(12,1fr)'} >
                    <GridItem {...MainContainerStyle}  >


                        <VStack spacing={30} paddingY={10} h={'100vh'} justifyContent={'center'}>

                            {currentStep === 0 ? <CommunityNameComponent community={community} setCommunity={setCommunity} /> : <></>}
                            {currentStep === 1 ? <SelectLocation locations={locations} setlocationId={setlocationId} locationId={locationId} /> : <></>}
                            {currentStep === 2 ? <Complete showError={showError} showSuccess={showSuccess} loading={loading} community={community} isDone={isDone} setIsDone={setIsDone} uid={user?.uid} locationId={locationId} setCurrentStep={setCurrentStep} /> : <></>}

                            <Box w={'60%'} pt={5}>
                                {currentStep === 0 ?
                                    <Button disabled={community === ''} onClick={() => setCurrentStep(1)} mt={30} width={'full'} borderRadius={'full'} size={'lg'}>
                                        Continue
                                    </Button>
                                    : <></>
                                }

                                {currentStep === 1 ?
                                    <HStack spacing={5} mt={30} alignItems={'center'} >
                                        <Button onClick={() => setCurrentStep(0)} width={'full'} borderRadius={'full'} size={'lg'}>
                                            Back
                                        </Button>
                                        <Button onClick={() => setCurrentStep(2)} width={'full'} borderRadius={'full'} size={'lg'}>
                                            Connect
                                        </Button>
                                    </HStack>
                                    : <></>
                                }


                                {currentStep === 2 ?
                                    <HStack spacing={5} mt={30} alignItems={'center'} >
                                        <Button onClick={() => setCurrentStep(1)} width={'full'} borderRadius={'full'} size={'lg'}>
                                            Back
                                        </Button>
                                        <Button disabled={!isDone} onClick={() => router.replace('/')} width={'full'} borderRadius={'full'} size={'lg'}>
                                            Done
                                        </Button>
                                    </HStack>

                                    : <></>
                                }

                            </Box>
                        </VStack>


                    </GridItem>
                    <GridItem colSpan={{ base: 12, md: 1 }} display={{ base: 'none', md: 'block' }}>
                        <Box h={'full'} w={'full'} >

                        </Box>
                    </GridItem>
                </Grid>
            </Box>
        </>

    );
}


