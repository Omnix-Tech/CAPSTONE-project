

import { HStack, Box, Text, Divider, IconButton } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'

import React from "react"
import JoinModal from "../../Forum/components/JoinModal"
import useForumHit from "./hook"


export default function ForumHit({ forumObj, connect, user }) {

    const { forum, showError, showSuccess, isOpen, onClose, modalRef, connects, participants, owner, isJoined, onOpen } = useForumHit({ forumObj, connect, user })

    if (isJoined === null | forum === null) return <></>


    return (
        <>
            {isJoined ?
                <></>
                :
                <JoinModal
                    currentUser={user}
                    showError={showError}
                    showSuccess={showSuccess}
                    isOpen={isOpen}
                    onClose={onClose}
                    modalRef={modalRef}
                    forum={forum}
                    connects={connects}
                    participants={participants}
                    owner={owner}
                />
            }


            <Box transition={'.25s'} _hover={{ cursor: 'pointer', bgColor: 'rgba(255,255,255,0.2)' }}>
                <HStack {...isJoined ? {
                    as: 'a',
                    href: `/forum/${forum.id}?${(new URLSearchParams({ connect: connect?.place_id }).toString())}`
                } : {
                    onClick: onOpen,
                    ref: modalRef
                }} px={5} py={2} color={'gray.300'} justifyContent={'space-between'} alignItems={'center'}>

                    <Box>
                        <Text color={'white'} fontWeight={'medium'} fontSize={'xs'} >{forum.title}</Text>
                        <Text pr={10} fontSize={'xs'} color={'gray.400'} noOfLines={2}>{forum.description}</Text>

                        {isJoined
                            ? <Text fontWeight={'medium'} fontSize={'x-small'} color={'white'}>Visit Forum</Text>
                            : <Text fontWeight={'medium'} fontSize={'x-small'} color={'white'}>Join Forum</Text>}

                    </Box>
                    <IconButton colorScheme={'whiteAlpha'} variant={'ghost'} borderRadius={'full'} size={'sm'} icon={<FeatherIcon size={16} icon={'arrow-up-right'} />} />
                </HStack>
                <Divider />
            </Box>
        </>

    )
}