import { Box, Heading, HStack, Text } from 'native-base'
import React from 'react'
import { AppContext } from '../app.context'
import { AlertContainer } from '../Components/alert.container'
import { FlatList } from 'react-native'



export default function Alerts({ navigation }) {
    const { user, location } = React.useContext(AppContext)
    const alerts = [1, 42, 4, 14, 1, 41, 4, 12, 41, 2412, 4, 14, 14, 1, 41, 4, 14, 1, 41, 24, 14, 14, 1, 41, 23, 13, 4, 1, 41, 4, 15]
    return (
        <Box>
            <HStack space={2} justifyContent={'flex-end'} paddingX={6} paddingY={3} bgColor={'light.100'}>
                <Heading size={'sm'} >{location?.area} Connect</Heading>
                <Heading size={'sm'} color={'muted.400'}>Alerts</Heading>
            </HStack>
            <Box my={3} bgColor={'coolGray.100'}>
                <FlatList
                    data={alerts}
                    renderItem={(props) => <AlertContainer {...props} navigation={navigation} />}
                    maxToRenderPerBatch={8}
                    bounces={true}
                    bouncesZoom={true}
                    keyExtractor={(item, index) => index}
                />
                <Box height={40}></Box>
            </Box>
        </Box>
    )
}