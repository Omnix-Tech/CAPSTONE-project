import React from 'react';
import { Box, Divider, Text } from '@chakra-ui/react';
import Post from '../Post';



export default function PublicForumContiner({ location, ...props }) {
    return (
        <Box {...props}>

            <Text px={5} color={'gray.400'} fontWeight={'medium'} textTransform={'uppercase'} fontSize={'xs'}>{location?.area} Forum</Text>
            <Divider my={2} />


            <Box h={'full'}  borderRight={'1px'} borderLeft={'1px'} borderLeftColor={'gray.300'} borderRightColor={'gray.300'}>
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </Box>


        </Box>
    );
}
