import React from "react"


import { AuthContext } from "../Auth/context"
import { Box, Button, IconButton, Input, VStack, Heading, Pressable, Text } from "native-base"
import { KeyboardAvoidingView } from "native-base"
import { Icon } from "react-native-elements"






export default function Login({ navigation }) {

    const { signIn } = React.useContext(AuthContext)
    const [visiblePassword, setVisiblePassword] = React.useState('password')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')


    return (
        <KeyboardAvoidingView>
            <Box padding={10} height='100vh'>

                <Heading marginBottom={30}>We Connect Login</Heading>
                <VStack alignItems={'center'} height={'full'}>
                    <Box marginY={3} width={'full'}>
                        <Input size={'lg'} variant={'filled'} onChangeText={(text) => setEmail(text)} value={email} placeholder="Email" type="email" />
                    </Box>

                    <Box marginY={3} width={'full'}>
                        <Input
                            size={'lg'}
                            variant={'filled'}
                            onChangeText={(text) => setPassword(text)}
                            value={password} placeholder="Password"
                            type={visiblePassword}
                            InputRightElement={
                                <IconButton
                                    onPress={() => setVisiblePassword(visiblePassword === 'text' ? 'password' : 'text')}
                                    icon={<Icon size={'md'} type="feather" name={visiblePassword === 'text' ? 'eye' : 'eye-off'} />} />} />
                    </Box>


                    <Box position={'absolute'} bottom={20} left={0} right={0}>
                        <Pressable onPress={() => navigation.navigate('Register')} my={5} display={'flex'} width={'full'} justifyContent='center'><Text textAlign={'center'}>Get Connected</Text></Pressable>
                        <Button onPress={() => signIn(email, password)} >Login</Button>
                    </Box>

                </VStack>

            </Box>

        </KeyboardAvoidingView>
    )
}