import React from 'react';
import { Box, Heading, VStack, Button, Divider, FormLabel, Input } from '@chakra-ui/react';
import Link from 'next/link';

import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import AuthLayout from '../../components/layout/auth.layout';
import useFeedback from '../../controller/hooks/useFeedback';

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


export default function Login() {

    const { showError, render } = useFeedback()
    const { signInForm } = require('../../forms')
    const { signInWithEmailAndPassword } = require('../../app/auth/auth.client')

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
        await signInWithEmailAndPassword(data).catch(error => showError({ message: error.message }))
    }

    return (
        <>
            {render()}
            <AuthLayout>
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
            </AuthLayout>

        </>
    );
}
