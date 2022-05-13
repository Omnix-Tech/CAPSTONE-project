import React from 'react';
import { Box, Heading, VStack, Button, Divider, HStack, FormLabel, Input } from '@chakra-ui/react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';


import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import useRequestHandlers from '../../controller/handlers';
import useFeedback from '../../controller/hooks/useFeedback';
import AuthLayout from '../../components/layout/auth.layout';

const styles = {
    Input: {
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
}



export default function Register() {

    const router = useRouter()
    const { registerForm } = require('../../forms')
    const { Post } = useRequestHandlers()
    const { showError, render } = useFeedback()

    const {
        handleSubmit,
        reset,
        control,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(registerForm),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    })

    const handleFormSubmit = async (data) => {
        Post('/api/register', data)
            .then(res => {
                const { token } = res
                router.replace({
                    pathname: '/setup',
                    query: { token }
                }, '/initialize')
            })
            .catch(error => showError({ message: error.message }))
    }

    return (
        <>
            {render()}
            <AuthLayout>
                <Box paddingX={{ base: 10, lg: 40 }} paddingY={'80px'} justifyContent={'center'}>
                    <Box>
                        <Heading size={'2xl'} color={'yellow.500'} >WeConnect</Heading>
                        <Heading textTransform={'uppercase'} size={'sm'} color={'white'} >Register</Heading>
                    </Box>

                    <Box mt={10}>

                        <form onSubmit={handleSubmit(data => handleFormSubmit(data))}>
                            <HStack w={'full'} justifyContent={'space-evenly'}>
                                <Box w={'full'} p={2}>
                                    <FormLabel fontSize={'sm'} color={'gray.300'} >First Name</FormLabel>
                                    <Controller
                                        name='firstName'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Input {...styles.Input} value={value} placeholder='First Name' onChange={(e) => onChange(e.target.value)} />
                                        )}
                                    />
                                </Box>
                                <Box w={'full'} p={2}>
                                    <FormLabel fontSize={'sm'} color={'gray.300'} >Last Name</FormLabel>
                                    <Controller
                                        name='lastName'
                                        control={control}
                                        render={({ field: { onChange, value } }) => (
                                            <Input {...styles.Input} value={value} placeholder='Last Name' onChange={(e) => onChange(e.target.value)} />
                                        )}
                                    />
                                </Box>
                            </HStack>


                            <Box p={2}>
                                <FormLabel fontSize={'sm'} color={'gray.300'} >Email</FormLabel>
                                <Controller
                                    name='email'
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input {...styles.Input} type={'email'} value={value} placeholder='yourmail@email.com' onChange={(e) => onChange(e.target.value)} />
                                    )}
                                />
                            </Box>


                            <Box p={2}>
                                <FormLabel fontSize={'sm'} color={'gray.300'} >Password</FormLabel>
                                <Controller
                                    name='password'
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input {...styles.Input} type={'password'} value={value} placeholder='Password' onChange={(e) => onChange(e.target.value)} />
                                    )}
                                />
                            </Box>


                            <Box p={2}>
                                <FormLabel fontSize={'sm'} color={'gray.300'} >Confirm Password</FormLabel>
                                <Controller
                                    name='confirmPassword'
                                    control={control}
                                    render={({ field: { onChange, value } }) => (
                                        <Input {...styles.Input} type={'password'} value={value} placeholder='Confirm Password' onChange={(e) => onChange(e.target.value)} />
                                    )}
                                />
                            </Box>



                            <Box my={10}>
                                <Button colorScheme={'yellow'} type='submit' width={'full'} borderRadius={'full'} size={'lg'}>
                                    Connect
                                </Button>
                            </Box>
                        </form>
                    </Box>

                    <Divider my={5} />
                    <VStack>
                        <Heading my={5} size={'sm'} color={'white'} >Already Connected?</Heading>
                        <Link passHref href={'/auth/login'}>
                            <Button width={'full'} borderRadius={'full'} size={'lg'}>
                                Sign In
                            </Button>
                        </Link>
                    </VStack>
                </Box>
            </AuthLayout>
        </>

    );
}
