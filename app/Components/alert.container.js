import { ImageBackground } from "react-native";
import { Box, Heading, HStack, VStack, Text, Button, Image, Divider } from "native-base";
import { Icon } from "react-native-elements";
import { PressableContainer } from "./components";

export function AlertSliderContainer({ navigation, item, index }) {
    return (
        <PressableContainer onPress={() => navigation.navigate('alertComp')}>
            <Box height={250} borderRadius={20} overflow={'hidden'} >
                <ImageBackground style={{ width: '100%', overflow: 'hidden' }} source={{ uri: 'https://images.unsplash.com/photo-1515757026668-f01a7685f66e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }} >
                    <VStack bgColor={'rgba(0, 0, 0, 0.8)'} padding={5} >
                        <Box height={'92%'}>
                            <Heading color={'light.100'} >Power Outage in your Area</Heading>
                            <HStack marginTop={3}>
                                <Icon type='feather' name='arrow-up-right' color={'#f4f4f4'} size={18} />
                                <Text color='light.300' >Loop News Jamaica</Text>
                            </HStack>
                        </Box>
                        <HStack justifyContent='flex-end'>
                            <Text color={'light.100'}>Learn More +</Text>
                        </HStack>
                    </VStack>
                </ImageBackground>
            </Box>
        </PressableContainer>
    )
}

export function AlertContainer({ navigation, item, index }) {
    return (
        <>
            <PressableContainer paddingX={8} onPress={() => navigation.navigate('alert')}>

                <HStack space={2} justifyContent={'space-between'}>
                    <Box>
                        <Heading color={'light.800'} size={'md'} noOfLines={2} width={200} isTruncated >Power Outage in your Area</Heading>
                        <VStack marginTop={3}>

                            <HStack>
                                <Icon type='feather' name='arrow-up-right' color={'#b4b4b4'} size={18} />
                                <Text bold color='muted.600' isTruncated >Loop News Jamaica</Text>
                            </HStack>
                            <Text bold color='muted.400' fontSize={12} >10 minutes ago</Text>

                        </VStack>
                    </Box>
                    <Image _alt={''} borderRadius={10} height={100} width={100} source={{ uri: 'https://images.unsplash.com/photo-1515757026668-f01a7685f66e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }} />
                </HStack>
                <Divider my={5} bgColor={'muted.300'} />
            </PressableContainer>

        </>
    )
}