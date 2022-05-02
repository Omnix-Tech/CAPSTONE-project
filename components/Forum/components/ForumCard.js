import React from "react";


import { Badge, Box, Button, Text, HStack, Divider, useDisclosure } from "@chakra-ui/react";
import { getDoc } from "firebase/firestore";

import useForums from "../../../controller/hooks/useForums";
import useFeedback from "../../../controller/hooks/useFeedback";
import JoinModal from "./JoinModal";


export default function ForumCard({ forum, currentUser }) {

    const { isOpen, onOpen, onClose } = useDisclosure()
    const modal = React.useRef()


    const { showError, showSuccess, render } = useFeedback()
    const [user, setUser] = React.useState(null)
    const { connects, participants, forum: forumDoc } = useForums({ forum_id: forum.forum.id })

    const handleSetUser = () => {
        getDoc(forumDoc.owner)
            .then(snapshot => setUser(snapshot.data()))
    }

    React.useEffect(() => {
        if (forumDoc) {
            handleSetUser()
        }
    }, [forumDoc])


    return (
        <>

            <JoinModal currentUser={currentUser} showError={showError} showSuccess={showSuccess} isOpen={isOpen} onClose={onClose} modalRef={modal} forum={forumDoc} connects={connects} participants={participants} owner={user} />


            {render()}

            {forumDoc ?
                <>
                    <Box my={4}>
                        <HStack justifyContent={'space-between'} alignItems={'start'}>

                            <Box px={2}>
                                <Text fontWeight={'medium'} fontSize={'xs'} >{forumDoc?.title}</Text>
                                {user ? <Text color={'gray.500'} fontSize={'x-small'} >Created by {`${user.firstName} ${user.lastName}`} </Text> : <></>}

                                <Text my={3} fontSize={'xs'} noOfLines={2} >{forumDoc?.description}</Text>

                                <Divider my={2} />

                                <HStack>
                                    <Badge fontSize={'x-small'} >{connects ? connects.length : 0} Connect(s)</Badge>
                                    <Badge fontSize={'x-small'}>{participants ? participants.length : 0} Participant(s)</Badge>
                                </HStack>
                            </Box>


                            <Button onClick={onOpen} variant={'ghost'} size={'xs'} borderRadius={2} colorScheme={'green'} >Join</Button>
                        </HStack>
                    </Box>
                    <Divider borderColor={'gray.400'} />
                </>

                :

                <></>}

        </>
    )
}