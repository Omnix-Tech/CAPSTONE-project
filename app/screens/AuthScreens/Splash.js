import { Button, Heading, Box, VStack } from 'native-base'
import React from 'react'
import { Container } from '../../Components/components'



export default function Splash({ navigation }) {
    return (
        <Container>
            <VStack height={'full'} justifyContent={'center'}>
                <Heading textAlign={'center'} mb={10} >We Connect</Heading>
                <Box paddingX={10}>
                    <Button size={'lg'} my={2} onPress={() => navigation.navigate('login')} >Login</Button>
                    <Button size={'lg'} my={2} onPress={() => navigation.navigate('register')} >Register</Button>
                </Box>
            </VStack>
        </Container>

    )
}