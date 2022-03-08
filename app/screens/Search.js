import { Box, Heading, HStack, IconButton, Input, Text, VStack, Spinner } from 'native-base'
import React from 'react'
import { Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler'
import { AppContext } from '../app.context'



export default function Search({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true)
    const matches = []
    return (
        <Box bgColor={'coolGray.300'}>
            <HStack paddingX={6} paddingY={3}  borderBottomRadius={20} bgColor={'light.100'}>
                <Input size={'lg'} placeholder='Search WeConnect' variant={'unstyled'} width={'full'} rightElement={<IconButton icon={<Icon type={'feather'} name={'search'} />} />} />
            </HStack>
            <Box height={'full'}>
                {isLoading ?
                    <>
                        <VStack height={'60%'} justifyContent={'center'} alignItems={'center'}>
                            <Spinner size="lg" />
                        </VStack>
                    </> :
                    <Box>
                        {/* {alerts.map((post, key) => {
                        return (
                            <AlertContainer key={key} navigation={navigation} />
                        )
                    })} */}
                    </Box>
                }
            </Box>
        </Box>
    )
}