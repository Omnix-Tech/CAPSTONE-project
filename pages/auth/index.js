import React from 'react';
import { Box, Grid, GridItem, Heading, VStack, Text, Button, Divider } from '@chakra-ui/react';
import Link from 'next/link';

const MainContainerStyle = {
    bg: 'rgba(0,0,0,0.6)',
    backdropFilter: 'blur(10px)',
    margin: { base: 0, lg: 0 },
    borderLeftRadius: 0,
    borderRightRadius: { base: 0, lg: 30 },
    colSpan: { base: 12, lg: 7 }
}

export default function Landing() {
    return (
        <Box  bgRepeat={'no-repeat !important'} bgPosition={'unset'} bgSize={'cover !important'} bg={`url('/images/bg.jpg')`}  >
            <Grid templateColumns={'repeat(12,1fr)'} >
                <GridItem {... MainContainerStyle} colSpan={{ base: 12, md: 7 }} >
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
                </GridItem>
                <GridItem colSpan={{ base: 12, md: 1 }} display={{ base: 'none', md: 'block' }}>
                    <Box h={'full'} w={'full'} >
                    </Box>
                </GridItem>
            </Grid>
        </Box>
    );
}
