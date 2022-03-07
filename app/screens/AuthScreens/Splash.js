import { Button, Heading, Box } from 'native-base'
import React from 'react'



export default function Splash({ navigation })  {
    return (
        <Box>
            <Heading>Splash</Heading>
            <Button onPress={() => navigation.navigate('login') } >Login</Button>
            <Button onPress={() => navigation.navigate('register') } >Register</Button>
        </Box>

    )
}