import React from "react"


import { AuthContext } from "../../app.context"
import { Box, Button, IconButton, Input, VStack, Heading, Pressable, Text, HStack } from "native-base"
import { Icon } from "react-native-elements"
import { Container, PressableContainer } from "../../Components/components"






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
        <Box height='full' bgColor={'info.900'}>

            <VStack justifyContent={'center'} alignItems={'center'} paddingY={20}>
                <Container>
                    <Heading fontSize={'3xl'} color={'light.100'} marginBottom={30}>We Connect Login</Heading>
                </Container>

                <Box borderBottomRadius={40} borderTopRadius={40} width={'full'} bgColor={'light.100'}>
                    <Container>
                        <VStack paddingY={50} justifyContent={'flex-start'} alignItems={'center'} >

                            <Box marginY={3} width={'full'}>
                                <Input borderRadius={20} variant={'filled'} size={'lg'} onChangeText={(text) => setEmail(text)} value={email} placeholder="Email" type="email" />
                            </Box>

                            <Box marginY={3} width={'full'}>
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
                        </VStack>
                    </Container>
                </Box>

                <Box width={'full'} marginTop={20} paddingX={5}>
                    <HStack justifyContent={'space-between'} alignItems={'center'}>
                        <PressableContainer onPress={() => navigation.navigate('register')}>
                            <Text fontWeight={'bold'} color={'light.100'}>
                                NOT REGISTERED?
                            </Text>
                        </PressableContainer>


                        <PressableContainer width={'1/2'} borderRadius={50} padding={3} bgColor={'amber.400'} onPress={handleSignIn}>
                            <HStack justifyContent={'space-between'} alignItems={'center'}>
                                <Text fontSize={20} width={'40%'} fontWeight={'bold'} color={'light.800'}>
                                    Login
                                </Text>
                                <Icon type='feather' name='user' />
                            </HStack>
                        </PressableContainer>


                    </HStack>

                </Box>
            </VStack>




        </Box>
    )
}