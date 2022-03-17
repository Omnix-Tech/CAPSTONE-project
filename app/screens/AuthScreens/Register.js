import React from "react"

import { Box, Button, IconButton, Input, VStack, Heading, Pressable, Text, HStack } from "native-base"
import { Icon } from "react-native-elements"
import { Container } from "../../Components/components"






export default function Register({ navigation }) {
    // const { register } = React.useContext(AuthContext)

    const [visiblePassword, setVisiblePassword] = React.useState('password')
    const [visibleConfirmPassword, setVisibleConfirmPassword] = React.useState('password')

    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')


    const handleRegister = (navigation) => {
        if (password != confirmPassword) {
            alert('Passwords do not match')
            return
        }
        navigation.replace('verification')
    }

    return (
        <Box paddingTop={20} bgColor={'info.800'}>
            <Container>
                <Heading paddingX={10} color={'amber.400'} fontWeight={'bold'} fontSize={'3xl'} >Get Connected</Heading>
            </Container>
            <Box borderBottomRadius={40} borderTopRadius={40} bgColor={'light.100'}>
                <Container>
                    <VStack paddingTop={10} justifyContent={'flex-start'} alignItems={'center'} height={'full'}>

                        <HStack marginY={3} width='full'>
                            <Box width={'1/2'} paddingX={2}>
                                <Input borderRadius={20} variant={'filled'} width={'full'} size={'lg'} onChangeText={(text) => setFirstName(text)} value={firstName} placeholder="First Name" type="text" />
                            </Box>
                            <Box width={'1/2'} paddingX={2}>
                                <Input borderRadius={20} variant={'filled'} width={'full'} size={'lg'} onChangeText={(text) => setLastName(text)} value={lastName} placeholder="Last Name" type="text" />
                            </Box>


                        </HStack>

                        <Box marginY={3} width={'full'} paddingX={2}>
                            <Input borderRadius={20} variant={'filled'} size={'lg'} onChangeText={(text) => setEmail(text)} value={email} placeholder="Email" type="email" />
                        </Box>

                        <Box marginY={3} width={'full'} paddingX={2}>
                            <Input
                                borderRadius={20} variant={'filled'}
                                size={'lg'}
                                onChangeText={(text) => setPassword(text)}
                                value={password} placeholder="Password"
                                type={visiblePassword}
                                InputRightElement={
                                    <IconButton
                                        onPress={() => setVisiblePassword(visiblePassword === 'text' ? 'password' : 'text')}
                                        icon={<Icon type="feather" name={visiblePassword === 'text' ? 'eye' : 'eye-off'} />} />} />
                        </Box>

                        <Box marginY={3} width={'full'} paddingX={2}>
                            <Input
                                borderRadius={20} variant={'filled'}
                                size={'lg'}
                                onChangeText={(text) => setConfirmPassword(text)}
                                value={confirmPassword} placeholder="Confirm Password"
                                type={visibleConfirmPassword}
                                InputRightElement={
                                    <IconButton
                                        onPress={() => setVisibleConfirmPassword(visibleConfirmPassword === 'text' ? 'password' : 'text')}
                                        icon={<Icon type="feather" name={visibleConfirmPassword === 'text' ? 'eye' : 'eye-off'} />} />} />
                        </Box>


                        <Box width={'full'} marginTop={20}>
                            <Button borderRadius={10} padding={3} bgColor={'amber.500'} onPress={() => handleRegister(navigation)} >Register</Button>
                            <Button colorScheme={'info'} mt={5} onPress={() => navigation.navigate('login')} variant={'link'} width={'full'} >Already Connected</Button>
                        </Box>

                    </VStack>

                </Container>
            </Box>
        </Box>

    )
}