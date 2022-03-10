
import React from 'react'


import { FlatList } from 'react-native'
import { AppContext } from '../app.context'
import { Icon } from 'react-native-elements'
import { Container, PressableContainer } from '../Components/components'
import { Box, HStack, IconButton, Input, Text, VStack, Spinner, Divider } from 'native-base'




export default function Search({ navigation }) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [searchParam, setSearchParam] = React.useState('')


    const suggestions = ['loyalty in the maing', 'popcorn']

    const handleSubmitSearch = ({ item: suggestion }) => {
        if (suggestion) {
            setSearchParam(suggestion)
            navigation.navigate('results', { searchParam: suggestion })
        } else {
            if (searchParam != '') navigation.navigate('results', { searchParam })
        }

    }

    return (
        <Box bgColor={'coolGray.200'}>
            <HStack paddingX={6} paddingY={3} borderBottomRadius={20} bgColor={'light.100'}>
                <Input
                    onChangeText={(e) => setSearchParam(e)}
                    value={searchParam}
                    size={'lg'}
                    placeholder='Search WeConnect'
                    variant={'unstyled'}
                    width={'full'}
                    
                    leftElement={searchParam === '' ? (
                        <></>
                    ) : (
                        <IconButton
                            onPress={() => setSearchParam('')}
                            icon={
                                <Icon type='feather' name='x' size={18} />
                            }
                        />
                    )
                    }

                    rightElement={
                        <IconButton
                            onPress={() => handleSubmitSearch({})}
                            icon={
                                <Icon type={'feather'} name={'search'} />
                            }
                        />
                    }
                />
            </HStack>
            <Box height={'full'}>
                {isLoading ?
                    <>
                        <VStack height={'60%'} justifyContent={'center'} alignItems={'center'}>
                            <Spinner size="lg" />
                        </VStack>
                    </> :
                    <Container>
                        <FlatList
                            data={suggestions}
                            renderItem={({ item }) => (
                                <>
                                    <PressableContainer onPress={() => handleSubmitSearch({ item })}>
                                        <HStack space={5} paddingY={4} alignItems={'center'}>
                                            <Icon color={'#b2b2b2'} size={16} type='feather' name='arrow-up-right' />
                                            <Text fontSize={16} bold color={'muted.600'}>{item}</Text>
                                        </HStack>
                                    </PressableContainer>
                                    <Divider my={1} bgColor={'light.300'} opacity={0.3} />
                                </>
                            )}
                            maxToRenderPerBatch={8}
                            bounces={true}
                            bouncesZoom={true}
                            keyExtractor={(item, index) => index}
                        />
                        <Box height={70}></Box>
                    </Container>
                }
            </Box>
        </Box>
    )
}