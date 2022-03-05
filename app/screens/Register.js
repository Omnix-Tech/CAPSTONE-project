import React from "react"

import { AuthContext } from "../Auth/context"
import { Box, Button, IconButton, Input, VStack, Heading, Pressable, Text, HStack } from "native-base"
import { KeyboardAvoidingView } from "native-base"
import { Icon } from "react-native-elements"






export default function Register({ navigation }) {
    const { register } = React.useContext(AuthContext)

    const [visiblePassword, setVisiblePassword] = React.useState('password')
    const [visibleConfirmPassword, setVisibleConfirmPassword] = React.useState('password')

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')


    const handleRegister = () => {
        if (password != confirmPassword) {
            alert('Passwords do not match')
            return
        }

        register(firstName, lastName, email, password)
    }

    return (
        <KeyboardAvoidingView>
            <Box padding={10} height='100vh'>

                <Heading marginBottom={30}>We Connect Register</Heading>
                <VStack alignItems={'center'} height={'full'}>

                    <HStack marginY={3} space={3} justifyContent={'even'} width='full'>
                        <Input size={'lg'} variant={'filled'} onChangeText={(text) => setFirstName(text)} value={firstName} placeholder="First Name" type="text" />
                        <Input size={'lg'} variant={'filled'} onChangeText={(text) => setLastName(text)} value={lastName} placeholder="Last Name" type="text" />
                    </HStack>


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

                    <Box marginY={3} width={'full'}>
                        <Input
                            size={'lg'}
                            variant={'filled'}
                            onChangeText={(text) => setConfirmPassword(text)}
                            value={confirmPassword} placeholder="Confirm Password"
                            type={visibleConfirmPassword}
                            InputRightElement={
                                <IconButton
                                    onPress={() => setVisibleConfirmPassword(visibleConfirmPassword === 'text' ? 'password' : 'text')}
                                    icon={<Icon size={'md'} type="feather" name={visibleConfirmPassword === 'text' ? 'eye' : 'eye-off'} />} />} />
                    </Box>


                    <Box position={'absolute'} bottom={20} left={0} right={0}>
                        <Pressable onPress={() => navigation.navigate('Login')} my={5} display={'flex'} width={'full'} justifyContent='center'><Text textAlign={'center'}>Already Connected</Text></Pressable>
                        <Button onPress={() => handleRegister()} >Regiister</Button>
                    </Box>

                </VStack>

            </Box>

        </KeyboardAvoidingView>
    )
}