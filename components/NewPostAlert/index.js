import { Box, HStack, Text, Button } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'
import React from 'react';

export default function NewPostAlert({ refresh, onClick }) {

    return (
        <>
            <Box display={refresh ? 'unset' : 'none'} position={'fixed'} top={40} right={'40%'} >
                <Button boxShadow={'0px -1px 16px -1px rgba(0,0,0,0.53)'} color={'white'} colorScheme={'green'} borderRadius={20} onClick={onClick} >
                    <HStack spacing={1} justifyContent={'center'} alignItems={'center'}>
                        <FeatherIcon icon={'chevrons-up'} />
                        <Text>New Posts</Text>
                    </HStack>
                </Button>
            </Box>
        </>

    );
}
