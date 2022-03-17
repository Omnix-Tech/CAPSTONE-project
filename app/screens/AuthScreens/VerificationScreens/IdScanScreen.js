import React, { useState } from 'react'
import { Box, Heading, HStack, Tooltip, VStack, Text } from 'native-base'
import Camera from '../../../Services/Permissions/camera.permission'
import { TouchableOpacity, useWindowDimensions } from 'react-native'
import { PressableContainer } from '../../../Components/components'
import { Icon } from 'react-native-elements'


export default function IdScanScreen() {
    const { width } = useWindowDimensions()
    const [useCamera, setUseCamera] = useState(false)

    return (
        <Box>
            <VStack height={'full'} bgColor={'light.900'}>
                <Box bgColor={'light.900'} height={'1/2'}>
                    <Box bgColor={'info.500'} height={'full'} borderBottomLeftRadius={'60'}>
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} paddingTop={20} width={width} borderBottomLeftRadius={'90'} bgColor={'light.100'} height={'full'} > </Box>
                    </Box>
                </Box>

                <Box bgColor={'light.100'} height={'1/2'}>
                    <Box bgColor={'info.900'} height={'full'} borderTopRightRadius={'60'}>
                        <Box height={'full'} width={'full'} borderTopRightRadius={'90'} bgColor={'light.900'} justifyContent={'center'} alignItems={'center'}>
                            <VStack space={5} paddingX={10} width={'full'} justifyContent={'center'} alignItems={'center'}>
                                <TouchableOpacity>
                                    <PressableContainer onPress={() => setUseCamera(true)} borderRadius={10} padding={3} bgColor={'amber.400'}>
                                        <HStack space={5} w={'full'} alignItems={'center'} justifyContent={'center'}>

                                            <Text fontWeight={'bold'} fontSize={'lg'}>Scan Document</Text>

                                            <Icon type='feather' name='camera' />

                                        </HStack>
                                    </PressableContainer>
                                </TouchableOpacity>


                                <TouchableOpacity>
                                    <PressableContainer borderRadius={10} padding={3} bgColor={'amber.400'}>
                                        <HStack space={2} w={'full'} alignItems={'center'} justifyContent={'center'}>

                                            <Text fontWeight={'bold'} fontSize={'lg'}>Upload Document</Text>
                                            <Box>
                                                <Icon type='feather' name='upload' />
                                            </Box>

                                        </HStack>
                                    </PressableContainer>
                                </TouchableOpacity>

                            </VStack>

                        </Box>
                    </Box>
                </Box>
            </VStack>

            {useCamera
                ? <Box position={'absolute'} top={0} bottom={0} left={0} right={0} >
                    <Camera closeCamera={() => setUseCamera(false)} />
                </Box>
                : <></>}


        </Box>
    )
}