import React from 'react';
import { Box, Grid, GridItem, Heading, VStack, Button, Divider, FormLabel, Input } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/dist/client/router';

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'


const InputStyle = {
    mb: 2,
    variant: 'filled',
    borderRadius: 5,
    bgColor: 'rgba(255,255,255,0.1)',
    textColor: 'white',

    _hover: {
        bgColor: 'rgba(255,255,255,0.2)'
    },

    _active: {
        borderColor: 'white' 
    },

    _focus: {
        borderColor: 'white' 
    }
}

const MainContainerStyle = {
    bg: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(10px)',
    margin: { base: 0, lg: 0 },
    borderLeftRadius: 0,
    borderRightRadius: { base: 0, lg: 30 },
    colSpan: { base: 12, lg: 7 }
}


export default function Register() {

    const router = useRouter()
    const { signInForm } = require('../../forms')
    const { signInWithEmailAndPassword } = require('../../auth/auth.client')

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(signInForm),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const handleFormSubmit = async (data) => {
        await signInWithEmailAndPassword(data).catch( error => alert(error.message))
    }

    return (
        <Box bgRepeat={'no-repeat !important'} bgPosition={'unset'} bgSize={'cover !important'} bg={`url('/images/bg.jpg')`}>
            <Grid templateColumns={'repeat(12,1fr)'} >
                <GridItem {...MainContainerStyle} colSpan={{ base: 12, lg: 7 }} >
                    <Box minH={'100vh'} paddingX={{ base: 10, lg: 40 }} paddingY={'80px'} justifyContent={'center'}>
                        <Box>
                            <Heading size={'2xl'} color={'yellow.500'} >WeConnect</Heading>
                            <Heading textTransform={'uppercase'} size={'sm'} color={'white'} >Sign In</Heading>
                        </Box>

                        <Box mt={10}>

                            <form onSubmit={handleSubmit(data => handleFormSubmit(data))}>
                                
                                <Box p={2}>
                                    <FormLabel fontSize={'sm'} color={'gray.300'} >Email</FormLabel>
                                    <Controller
                                        name='email'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Input {...InputStyle} type={'email'} value={value} placeholder='yourmail@email.com' onChange={(e) => onChange(e.target.value)} />
                                        )}
                                    />
                                </Box>


                                <Box p={2}>
                                    <FormLabel fontSize={'sm'} color={'gray.300'} >Password</FormLabel>
                                    <Controller
                                        name='password'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Input {...InputStyle} type={'password'} value={value} placeholder='Password' onChange={(e) => onChange(e.target.value)} />
                                        )}
                                    />
                                </Box>



                                <Box my={10}>
                                    <Button colorScheme={'yellow'} type='submit' width={'full'} borderRadius={'full'} size={'lg'}>
                                        Sign In
                                    </Button>
                                </Box>
                            </form>
                        </Box>

                        <Divider my={5} />
                        <VStack>
                            <Heading my={5} size={'sm'} color={'white'} >Not Connected?</Heading>
                            <Link passHref href={'/auth/register'}>
                                <Button width={'full'} borderRadius={'full'} size={'lg'}>
                                    Get Connected
                                </Button>
                            </Link>
                        </VStack>
                    </Box>

                </GridItem>
                <GridItem colSpan={{ base: 12, lg: 1 }} display={{ base: 'none', lg: 'block' }}>
                    <Box h={'full'} w={'full'} >
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
}
