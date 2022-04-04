import { Avatar, Box, Button, Divider, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const CardStyle = {
    alignItems: 'flex-start',
    color: 'gray.700',
    fontSize: 'sm',
    p: 15,
    w: 'fit-content',
    transition: '0.25s',
    _hover: {
        bg: 'rgba(0,0,0,0.1)',
        cursor: 'pointer'
    }
}

export default function ReponseCard({ self }) {
    return (
        <>
            <Box
                {...CardStyle}
            >
                <HStack alignItems={'center'} >
                    <Avatar size={'sm'} />
                    <Box>
                        <HStack>
                            <Text lineHeight={0} color={self ? 'green.600' : 'blue.600'} fontWeight={'medium'} mb={2}>{self ? 'Johnny Brown' : 'You'}</Text>
                            <Text lineHeight={0} fontSize={'xs'} >10 mins ago</Text>
                        </HStack>

                        {self ? <></> : <Button p={0} size={'xs'} variant={'link'}>Delete</Button>}
                    </Box>
                </HStack>
                <Divider my={2} />

                <Text>
                    Hello World this is a testamet to teh eja erfnna  wefj wefinfwf wfiwnfweifnw fw fw fjad ad jwe ewd jwnwnk
                </Text>
            </Box>
        </>

    );
}
