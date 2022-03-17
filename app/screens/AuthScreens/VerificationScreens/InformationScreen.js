import React from 'react';
import { Box, Heading, VStack, Text } from 'native-base';
import { useWindowDimensions } from 'react-native';
import { Container } from '../../../Components/components';

import { Image } from 'react-native'

export default function InformationScreen(props) {
    const { width } = useWindowDimensions()
    return (
        <Box>
            <VStack height={'full'} bgColor={'light.900'}>
                <Box bgColor={'light.900'} height={'1/2'}>
                    <Box bgColor={'info.500'} height={'full'} borderBottomRightRadius={'60'}>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} paddingTop={20} width={width} borderBottomRightRadius={'90'} bgColor={'info.800'} height={'full'} >

                            <Container>
                                <Heading fontWeight={'bold'} fontSize={'5xl'} color={'amber.400'}>Get Started</Heading>
                                <Text paddingRight={5} color={'info.100'} fontWeight={'medium'} fontSize={'lg'}>Before you can enjoy the benefits of WeConnect you are required to go through a verification process press <Text fontWeight={'bold'} color={'amber.400'}>Next</Text> to continue</Text>
                            </Container>
                        </Box>
                    </Box>
                </Box>

                <Box bgColor={'info.800'} height={'1/2'}>
                    <Box bgColor={'info.900'} height={'full'} borderTopLeftRadius={'60'}>
                        <Box height={'full'} width={'full'} borderTopLeftRadius={'90'} bgColor={'light.900'}>
                            <Image source={{ uri: '../../../assets/daily.png' }} />
                        </Box>
                    </Box>
                </Box>
            </VStack>
        </Box>
    );
}
