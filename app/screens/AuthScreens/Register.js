import { Button, Heading, Box } from 'native-base'
import React from 'react'



export default function Register({ navigation }) {
    return (
        <Box>
            <Heading>Register</Heading>
            <Button onPress={() => alert('Register') } >Register</Button>
        </Box>

    )
}