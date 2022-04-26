import React from 'react'


import { Box, Text, Divider, HStack, ButtonGroup, Button, IconButton } from '@chakra-ui/react'
import FeatherIcon from 'feather-icons-react'
import { ConnectPopover } from './ConnectInfo'
import useAPIs from '../../controller/handlers'
import { AlertContext } from '../../controller/context'






export default function ConnectsContainer({ connectsDocs, otherLocations, currentUser, handleSetConnect }) {
    const { registerUserLocation, deleteUserLocation } = useAPIs()
    const { alert: createAlert } = React.useContext(AlertContext)

    const handleSetUserLocation = (locationId) => {
        createAlert({ isLoading: true })
        registerUserLocation({ locationId, uid: currentUser.uid })
            .then(response => {
                if (response.error) {
                    createAlert({ message: 'Something went wrong', status: 'error' })
                    return
                }
                createAlert({ message: 'Connected', status: 'success' })
            })
            .catch(error => createAlert({ message: 'Something went wrong', status: 'error' }))
    }

    const handleRemoveUserLocation = (locationId) => {
        createAlert({ isLoading: true })
        deleteUserLocation({ locationId, uid: currentUser.uid })
            .then(response => {
                if (response.error) {
                    createAlert({ message: 'Something went wrong', status: 'error' })
                    return
                }

                createAlert({ message: 'Disconnect', status: 'success' })
            })
            .catch(error => createAlert({ message: 'Something went wrong', status: 'error' }))
    }

    return (
        <>
            <Box py={10}>
                <Box px={10}>
                    <Text fontWeight={'medium'} >Your Connects</Text>
                    <Divider my={2} />


                    {connectsDocs.map(connect => (
                        <HStack my={5} key={connect.place_id} justifyContent={'space-between'} alignItems={'center'} >
                            <Box>
                                <Text fontWeight={'medium'} >{connect.area}</Text>
                                <Text fontWeight={'medium'} fontSize={'x-small'} >{connect.parish}</Text>
                            </Box>

                            <ButtonGroup colorScheme={'linkedin'} size={'sm'} >
                                <ConnectPopover connect={connect} />
                                <IconButton onClick={() => handleRemoveUserLocation(connect.place_id)} borderRadius={'full'} icon={<FeatherIcon size={16} icon={'trash-2'} />} />
                            </ButtonGroup>
                        </HStack>
                    ))}
                </Box>

                <Divider my={10} />

                <Box px={10}>
                    <Text fontWeight={'medium'} >Other Connects</Text>
                    <Divider my={2} />


                    {otherLocations.map(connect => (
                        <HStack my={5} key={connect.place_id} justifyContent={'space-between'} alignItems={'center'} >
                            <Box>
                                <Text fontWeight={'medium'} >{connect.area}</Text>
                                <Text fontWeight={'medium'} fontSize={'x-small'} >{connect.parish}</Text>
                            </Box>

                            <ButtonGroup size={'sm'} borderRadius={'full'} >
                                <Button onClick={() => handleSetUserLocation(connect.place_id)} colorScheme={'linkedin'} borderRadius={'full'}>
                                    Join
                                </Button>
                                <Button variant={'ghost'} borderRadius={'full'} >
                                    Visit
                                </Button>
                            </ButtonGroup>
                        </HStack>
                    ))}
                </Box>
            </Box>

        </>
    )
}