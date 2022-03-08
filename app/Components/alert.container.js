import { ImageBackground } from "react-native";
import { Box, Heading, HStack, VStack, Text, Button } from "native-base";
import { Icon } from "react-native-elements";

export function AlertSliderContainer({navigation, item, index}) {
    return (
         <Box style={{ elevation: 1 }} height={300} borderRadius={20} overflow={'hidden'} >
                <ImageBackground style={{ width: '100%', overflow: 'hidden' }} source={{ uri: 'https://images.unsplash.com/photo-1515757026668-f01a7685f66e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' }} >
                    <VStack bgColor={'rgba(0, 0, 0, 0.8)'} padding={5} >
                        <Box height={'87%'}>
                            <Heading color={'light.100'} >Power Outage in your Area</Heading>
                            <HStack marginTop={3}>
                                <Icon type='feather' name='arrow-up-right' color={'#f4f4f4'} size={18} />
                                <Text color='light.300' >Loop News Jamaica</Text>
                            </HStack>
                        </Box>
                        <HStack justifyContent='flex-end'>
                            <Button onPress={ () => navigation.navigate('alertComp')} variant={'ghost'} >Learn More +</Button>
                        </HStack>
                    </VStack>
                </ImageBackground>
            </Box>
    )
}