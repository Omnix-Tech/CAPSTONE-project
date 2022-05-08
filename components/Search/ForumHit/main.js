import useForumHit from "./hook"

import { Box, HStack, Text, Divider, IconButton } from "@chakra-ui/react"
import JoinModal from "../../Forum/components/JoinModal"
import FeatherIcon from 'feather-icons-react'





export default function MainForumHit({ forumObj, connect, user }) {

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


            <Box transition={'.25s'} _hover={{ cursor: 'pointer', bgColor: 'rgba(255,255,255,0.7)' }}>
                <HStack {...isJoined ? {
                    as: 'a',
                    href: `/forum/${forum.id}?${(new URLSearchParams({ connect: connect?.place_id }).toString())}`
                } : {
                    onClick: onOpen,
                    ref: modalRef
                }} px={5} py={5} color={'gray.800'} justifyContent={'space-between'} alignItems={'center'}>

                    <Box>
                        <Text fontWeight={'medium'} fontSize={'xs'} >{forum.title}</Text>
                        <Text pr={10} fontSize={'xs'} color={'gray.800'} noOfLines={2}>{forum.description}</Text>

                        {isJoined
                            ? <Text fontWeight={'medium'} fontSize={'x-small'}>Visit Forum</Text>
                            : <Text fontWeight={'medium'} fontSize={'x-small'}>Join Forum</Text>}

                    </Box>
                    <IconButton colorScheme={'blackAlpha'} variant={'ghost'} borderRadius={'full'} size={'sm'} icon={<FeatherIcon size={16} icon={'arrow-up-right'} />} />
                </HStack>
                <Divider />
            </Box>
        </>
    )
}