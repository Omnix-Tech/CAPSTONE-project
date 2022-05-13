import React from 'react';
import { Box, Heading, Text, Button, Divider, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import AuthLayout from '../../components/layout/auth.layout';

export default function Landing() {
    return (
        <AuthLayout>
            <VStack paddingY={10} h={'100vh'} justifyContent={'center'}>
                <Box paddingX={{ base: 5, md: 40 }}>
                    <Box>
                        <Heading color={'yellow.500'} >Join WeConnect</Heading>
                        <Text color={'white'} textAlign={'center'} fontWeight={'bold'} textTransform={'uppercase'} >Get Connected Today</Text>
                    </Box>
                </Box>

                <Box w={'60%'} py={10}>
                    <Box my={2}>
                        <Link replace passHref href={'/auth/register'} >
                            <Button width={'full'} borderRadius={'full'} size={'lg'}>
                                Get Connected
                            </Button>
                        </Link>

                    </Box>

                    <Divider my={5} />

                    <Heading color={'white'} textAlign={'center'} my={5} size={'sm'} >Already Connected?</Heading>
                    <Link replace passHref href={'/auth/login'}>
                        <Button bgColor={'yellow.500'} width={'full'} borderRadius={'full'} size={'lg'}>
                            Sign In
                        </Button>
                    </Link>

                </Box>
            </VStack>

        </AuthLayout>

    );
}
