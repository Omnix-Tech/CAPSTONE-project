import React from "react"


import { AuthContext } from "../Auth/context"
import { Box, Button } from "native-base"






export default function Login({ navigation }) {
    const { signIn } = React.useContext(AuthContext)
    return (
        <Box>
            <Button onPress={() => signIn()} >Login</Button>
        </Box>
    )
}