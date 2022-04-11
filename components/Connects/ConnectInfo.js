import { Button, Popover, PopoverTrigger, PopoverContent, PopoverCloseButton, Text, Divider, Box, useDisclosure, HStack } from '@chakra-ui/react';
import { collection, doc, where, query } from '@firebase/firestore';
import React from 'react';

import FeatherIcon from 'feather-icons-react'


import { useCollectionOnce } from 'react-firebase-hooks/firestore'
import { firestore } from '../../app/config/firebase.config';




export function ConnectInfo({ connect }) {
    const [querySnapshot] = useCollectionOnce(query(
        collection(firestore, `User_Location`),
        where('location', '==', doc(firestore, `Locations/${connect?.place_id}`))
    ))


    return (
        <Box>
            {connect ?
                <>
                    <Box>
                        <Text fontWeight={'medium'} >{connect.area}</Text>
                        <Text fontWeight={'medium'} fontSize={'x-small'} >{connect.parish}</Text>
                    </Box>
                    <Divider my={5} />

                    {connect.councillors.map(councillor => (
                        <>
                            <Text fontSize={'x-small'} fontWeight={'medium'} >Councillor</Text>
                            <Text fontSize={'sm'} fontWeight={'medium'} >{councillor.name}</Text>
                            <Text fontSize={'x-small'} fontWeight={'medium'} >{councillor.email}</Text>

                        </>
                    ))}


                    <Divider my={2} />
                    {querySnapshot ?
                        <HStack spacing={2}>
                            <FeatherIcon size={14} icon={'users'} />
                            <Text fontWeight={'medium'} fontSize={'sm'} >{querySnapshot?.size === 1 ? `${querySnapshot?.size} Member` : `${querySnapshot?.size} Members`} </Text>
                        </HStack>

                        : <></>
                    }
                </>
                :
                <></>}

        </Box>
    )
}



export function ConnectPopover({ connect }) {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const ref = React.useRef(null)

    return (
        <Popover
            isOpen={isOpen}
            initialFocusRef={ref}
            onOpen={onOpen}
            onClose={onClose}
            placement={'right'}
            closOnBlur={false}
        >
            <PopoverTrigger>
                <Button borderRadius={'full'} variant={'ghost'} >
                    About
                </Button>
            </PopoverTrigger>

            <PopoverContent p={5} _focus={{ outline: 'none', boxShadow: 'none' }}>
                <PopoverCloseButton _focus={{ outline: 'none', boxShadow: 'none' }} />
                <ConnectInfo connect={connect} />
            </PopoverContent>

        </Popover>
    );
}
