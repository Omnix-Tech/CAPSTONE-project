import React from 'react'


import { Box, Heading, Text, Button, Stack, Container } from 'native-base'


const styles = {

    heading: {
        size: "xl"
    },

    textStyle: {
        fontSize: "18px"
    },

    buttonStyle: {
        variant: "ghost",
        size: "lg",
        my: "10px"
    },

    loginButton: {

    }
}

export default function Landing({ navigation }) {
    return (
        <Box>
            <Heading {...styles.heading}>WeConnect</Heading>
            <Text {...styles.textStyle}>Get Connected to your community</Text>


            <Stack>
                <Button {...styles.buttonStyle} onPress={() => navigation.navigate('Login')} >Login</Button>
                <Button {...styles.buttonStyle} onPress={() => navigation.navigate('Register')} >Register</Button>
            </Stack>

        </Box>
    )
}