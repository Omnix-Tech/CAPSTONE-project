import { Badge, Box, Button, Text, HStack, Divider } from "@chakra-ui/react";
import { useDocumentData } from "react-firebase-hooks/firestore";

import useForums from "../../../controller/hooks/useForums";

export default function ForumContainer({ forum }) {

    const [forumDoc] = useDocumentData(forum.forum)
    const { connects, participants } = useForums({ forum_id: forum.forum.id })

    return (
        <>

            {forumDoc ?
            <>
            <Box my={4}>
                    <HStack justifyContent={'space-between'} alignItems={'start'}>

                        <Box px={2}>
                            <Text fontWeight={'medium'} fontSize={'xs'} >{ forumDoc?.title }</Text>
                            <Text color={'gray.500'} fontSize={'x-small'} >Created by </Text>

                            <Text my={3} fontSize={'xs'} noOfLines={2} >{ forumDoc?.description }</Text>

                            <Divider my={2} />

                            <HStack>
                                <Badge fontSize={'x-small'} >{ connects ? connects.length : 0 } Connects</Badge>
                                <Badge fontSize={'x-small'}>{ participants ? participants.length : 0 } Participants</Badge>
                            </HStack>
                        </Box>


                        <Button variant={'ghost'} fontSize={'xs'} borderRadius={2} colorScheme={'green'} >Join</Button>
                    </HStack>
                </Box>
                <Divider borderColor={'gray.400'} />
            </>
                
                :

                <></>}

        </>
    )
}