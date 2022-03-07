
import { Box, useDisclose, Stagger, IconButton, HStack } from 'native-base'
import { Icon } from 'react-native-elements'

export function PostStack() {
    const { isOpen, onToggle } = useDisclose()
    const boxStyle = {
        // position: 'absolute',
        // bottom: 78,
        // right: 2
    }
    return (
        <Box {...boxStyle}>
            <Stagger visible={isOpen} initial={{
                opacity: 0,
                scale: 0,
                translateY: 34
            }} animate={{
                translateY: 0,
                scale: 1,
                opacity: 1,

                transition: {
                    type: "spring",
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
                <IconButton mb={5} variant='solid' borderRadius={'full'} icon={<Icon type='feather' name='plus' />} />
                <IconButton mb={5} variant='solid' borderRadius={'full'} icon={<Icon type='feather' name='message-circle' />} />
            </Stagger>

            <HStack alignItems={'center'}>
                <IconButton
                    variant={'solid'}
                    borderRadius={'full'}
                    size={'lg'}
                    onPress={onToggle}
                    icon={ <Icon type='feather' name='more-vertical' /> } />
            </HStack>
        </Box>

    )
}