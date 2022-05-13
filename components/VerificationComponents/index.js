

import { Box, Text, Grid, GridItem, VStack, HStack, Button, Image } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'



const styles = {
    Subtitle: {
        color: 'linkedin.900',
        fontWeight: 'bold',
        fontSize: '2xl',
        textAlign: 'center'
    }
}

export default function Verify({ setStep, user }) {


    return (
        <Box>
            <Text fontSize={'3xl'} textTransform={'uppercase'} fontWeight={'bold'}>Welcome { user ? user.displayName : "" }</Text>
            <Text mt={5} color={'black'} fontSize={'xl'} fontWeight={'medium'} >{`Before you get started, Let's get you verified`}</Text>

            <Box mt={8}>
                <Grid templateColumns={'repeat(12,1fr)'} >
                    <GridItem colSpan={{ base: 12, md: 4 }}>
                        <VStack p={10} justifyContent={'center'}>
                            <Image src='/images/communicate.png' h={100} />
                            <Text {...styles.Subtitle}>Communicate Better</Text>
                        </VStack>
                    </GridItem>
                    <GridItem p={10} colSpan={{ base: 12, md: 4 }}>
                        <VStack justifyContent={'center'}>
                            <Image src='/images/security.png' h={100} />
                            <Text {...styles.Subtitle}>Stay Secure, Stay Vigilant</Text>
                        </VStack>
                    </GridItem>
                    <GridItem p={10} flexDirection={'column'} justifyContent={'center'} colSpan={{ base: 12, md: 4 }}>
                        <VStack justifyContent={'center'}>
                            <Image src='/images/info.png' h={100} />
                            <Text {...styles.Subtitle}>Stay Informed</Text>
                        </VStack>
                    </GridItem>
                </Grid>
            </Box>


            <HStack mt={10} justifyContent={'end'}>
                <Button onClick={() => setStep(1)} my={5} variant={'ghost'} colorScheme={'blackAlpha'} size={'md'}>
                    <HStack alignItems={'center'}>
                        <Text fontWeight={'medium'}>Verify Account</Text>
                        <FeatherIcon icon={'arrow-right-circle'} />
                    </HStack>
                </Button>
            </HStack>
        </Box>
    )
}