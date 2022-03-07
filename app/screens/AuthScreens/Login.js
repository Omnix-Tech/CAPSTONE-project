import React from "react"


import { AuthContext } from "../../app.context"
import { Box, Button, IconButton, Input, VStack, Heading, Pressable, Text } from "native-base"
import { Icon } from "react-native-elements"






export default function Login({ navigation }) {

    const { signIn } = React.useContext(AuthContext)
    const [visiblePassword, setVisiblePassword] = React.useState('password')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)


    const handleSignIn = async () => {
        setIsLoading(true)
        await signIn(email, password).catch(error => alert(error.message))
        setIsLoading(false)
    }


    if (isLoading) return (<Text>Loading...</Text>)

    return (
        <Box padding={10} height='full'>


            <VStack justifyContent={'center'} alignItems={'center'} height={'full'}>
                <Heading marginBottom={30}>We Connect Login</Heading>
                <Box marginY={3} width={'full'}>
                    <Input size={'lg'} onChangeText={(text) => setEmail(text)} value={email} placeholder="Email" type="email" />
                </Box>

                <Box marginY={3} width={'full'}>
                    <Input
                        size={'lg'}
                        onChangeText={(text) => setPassword(text)}
                        value={password} placeholder="Password"
                        type={visiblePassword}
                        InputRightElement={
                            <IconButton
                                onPress={() => setVisiblePassword(visiblePassword === 'text' ? 'password' : 'text')}
                                icon={<Icon type="feather" name={visiblePassword === 'text' ? 'eye' : 'eye-off'} />} />} />
                </Box>


                <Box width={'full'}>
                    <Pressable onPress={() => navigation.navigate('register')} my={5} width={'full'} justifyContent='center'><Text textAlign={'center'}>Get Connected</Text></Pressable>
                    <Button width={'full'} onPress={handleSignIn} >Login</Button>
                </Box>

            </VStack>

        </Box>
    )
}