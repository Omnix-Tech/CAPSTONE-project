
import { Box, useDisclose, Stagger, IconButton, HStack } from 'native-base'
import { Icon } from 'react-native-elements'


const elevation = {
    elevation: 2
}

export function PostStack({ navigation, setNewPost }) {
    const { isOpen, onToggle } = useDisclose()
    const boxStyle = {
        position: 'absolute',
        bottom: 90,
        right: 5
    }
    return (
        <Box zIndex={'1'} {...boxStyle}>
            <Stagger visible={isOpen} initial={{
                opacity: 0,
                scale: 0,
                translateY: 34
            }} animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,

                transition: {
                    type: 'spring',
                    mass: 0.8,
                    stagger: {
                        offset: 30,
                        reverse: true
                    }
                }
            }} exit={{
                translateY: 34,
                scale: 0.5,
                opacity: 0,
                transition: {
                    duration: 100,
                    stagger: {
                        offset: 30,
                        reverse: true
                    }
                }
            }}>
                <IconButton {... elevation} bgColor={'coolGray.200'} onPress={() => setNewPost(true)} size={'lg'} mb={5} variant='ghost' borderRadius={100} icon={<Icon type='feather' name='plus' />} />
                <IconButton {... elevation} bgColor={'coolGray.200'} size={'lg'} mb={5} variant='ghost' borderRadius={100} icon={<Icon type='feather' name='message-circle' />} />
            </Stagger>

            <HStack alignItems={'center'}>
                <IconButton
                    size={'lg'}
                    borderRadius={100}
                    onPress={onToggle}
                    bgColor={'coolGray.800'}
                    {... elevation}
                    icon={ <Icon color={'#fff'} type='feather' name='more-vertical' /> } />
            </HStack>
        </Box>

    )
}

