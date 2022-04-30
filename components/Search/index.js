import React from 'react';
import { Box, Input, InputGroup, InputRightAddon } from '@chakra-ui/react';

import FeatherIcon from 'feather-icons-react'


const InputStyle = {
    mb: 2,
    variant: 'filled',
    borderRadius: 10,
    bgColor: 'rgba(255,255,255,0.1)',
    textColor: 'white',

    _hover: {
        bgColor: 'rgba(255,255,255,0.2)'
    },

    _active: {
        borderColor: 'white'
    },

    _focus: {
        borderColor: 'white'
    }
}


export default function SearchContainer({ ...props }) {
    return (
        <Box {...props} borderLeftRadius={10} overflow={'hidden'} h={'full'} bgPosition={'center !important'} bgSize={'cover !important'} w={'100%'} bg={`url('/images/bg.jpg')`} >
            <Box bg={'rgba(0,0,0,0.6)'} backdropFilter={'blur(10px)'} h={'full'} p={5}>
                <InputGroup>
                    <Input {...InputStyle} placeholder={'Search'} />
                    <InputRightAddon border={'none'}  {...InputStyle}>
                        <Box _hover={{ cursor: 'pointer' }}>
                            <FeatherIcon icon={'search'} />
                        </Box>
                    </InputRightAddon>
                </InputGroup>
            </Box>
        </Box>
    );
}
