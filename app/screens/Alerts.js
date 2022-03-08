import { Box, Heading, HStack, Text } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { AppContext } from '../app.context'
import { AlertContainer } from '../Components/alert.container'



export default function Alerts({ navigation }) {
    const { user, location } = React.useContext(AppContext)
    const alerts = [1,2,3,4,5]
    return (
        <Box>
            <HStack space={2} justifyContent={'flex-end'} paddingX={6} paddingY={3} bgColor={'light.100'}>
                <Heading size={'sm'} >{location?.area} Connect</Heading>
                <Heading size={'sm'} color={'muted.400'}>Alerts</Heading>
            </HStack>
            <ScrollView >
            <Box my={3} bgColor={'coolGray.100'}>
                
                    <Box>
                        {alerts.map((post, key) => {
                            return (
                                <AlertContainer key={key} navigation={navigation} />
                            )
                        })}
                    </Box>
                    <Box height={40}></Box>
            </Box>
            </ScrollView>
        </Box>
    )
}