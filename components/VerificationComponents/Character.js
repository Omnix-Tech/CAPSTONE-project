import React, { useEffect, useState } from 'react'

import { Text, HStack, Button, Image, VStack } from "@chakra-ui/react";
import FeatherIcon from 'feather-icons-react'
import { Post } from '../../controller/handlers';

export default function CharacterVerification({ user, connect, userDoc }) {

    const [isVerified, setIsVerified] = useState()
    const [isComplete, setIsComplete] = useState()


    const initiateVerification = () => {
        Post(`/api/verify/${user.uid}`, {
            location: connect.place_id
        })
        .then(res => {
            const { isVerified } = res
            console.log(res)
            setIsVerified(isVerified)
            setIsComplete(true)
        })
        .catch(error => {
            console.log(error)
            setIsComplete(true)
            setIsVerified(false)
        })
    }

    useEffect( () => {
        if (connect && user ) initiateVerification()

        
    }, [connect, user] )

    useEffect(() => {
        if (userDoc) {
            setIsComplete(userDoc.isVerifying)
            setIsVerified(userDoc.verified)
        }
    }, [userDoc])

    return (
        <VStack h={'100%'}  justifyItems={'stretch'} >
            {isComplete ?
                isVerified ?
                    <VStack justifyItems={'stretch'} >
                        <Text fontSize={'3xl'} fontWeight={'bold'}>Account Verified</Text>
                        <Text color={'black'} fontSize={'xl'} fontWeight={'medium'} >
                            Press Next to Get Connected
                        </Text>
                    </VStack>
                    :
                    <VStack>
                        <Text fontSize={'3xl'} fontWeight={'bold'}>Verification Error</Text>
                        <Text color={'black'} fontSize={'xl'} fontWeight={'medium'} >
                            Press Next to Get Connected
                        </Text>
                    </VStack>
                :
                <VStack justifyItems={'stretch'} >
                    <Text fontSize={'3xl'} fontWeight={'bold'}>Verifying Account</Text>

                    <Text mt={5} color={'black'} fontSize={'xl'} fontWeight={'medium'} >
                        This might take a while...
                    </Text>
                    <Text color={'black'} fontSize={'xl'} fontWeight={'medium'} >
                        Please wait while we verify your account.
                    </Text>

                    <HStack>
                        <Image alt='' w={200} src={'/images/loading.gif'} />
                    </HStack>
                </VStack>
            }

            <HStack mt={40} justifyContent={'end'}>
                <Button as={'a'} href={'/'} disabled={!isVerified} colorScheme={'green'} variant={'ghost'} >
                    <HStack alignItems={'center'}>
                        <Text fontWeight={'medium'}>Next</Text>
                        <FeatherIcon icon={'arrow-right-circle'} />
                    </HStack>
                </Button>
                <Button onClick={initiateVerification} disabled={isVerified} colorScheme={'green'} variant={'ghost'} >
                    <HStack alignItems={'center'}>
                        <Text fontWeight={'medium'}>Retry</Text>
                        <FeatherIcon icon={'repeat'} />
                    </HStack>
                </Button>
            </HStack>
        </VStack>
    )
}