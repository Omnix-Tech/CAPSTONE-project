import { Box, HStack, VStack, Button, Text, Divider } from "native-base";
import { Icon } from "react-native-elements";
import { Container } from "./components";


export function JoinForumContainer({ navigation }) {
    const style = {
        elevation: 1
    }
    return (
        <Box {...style} borderRadius={5} bgColor={'light.50'} marginBottom={2}>
            <Container paddingX={4} >
                <HStack space={3} justifyContent={'space-between'}>
                    <VStack>
                        <Text bold fontSize={16} noOfLines={3} isTruncated >Computer Science Industry</Text>
                        <Text color={'muted.400'}><Text bold>Owner</Text> Joel Henry</Text>
                    </VStack>
                    <Button onPress={() => alert('Join Forum')} variant='ghost'>{('Join').toUpperCase()}</Button>
                </HStack>
                <Divider my="2" />
                <HStack justifyContent={'space-between'}>
                    <HStack space={1} alignItems={'center'}>
                        <Icon size={12} type='feather' name='map-pin' />
                        <Text fontSize={12}>10 Connects</Text>
                    </HStack>

                    <HStack space={1} alignItems={'center'}>
                        <Icon size={12} type='feather' name='users' />
                        <Text fontSize={12}>10 Participants</Text>
                    </HStack>
                </HStack>

            </Container>
        </Box>
    )
}