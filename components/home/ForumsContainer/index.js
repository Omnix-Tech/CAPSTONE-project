import { Center, Spinner, Text, Divider, Button } from "@chakra-ui/react"
import useForums from "../../../controller/hooks/useForums"
import ForumContainer from "./ForumContainer"
import JoinedForumContainer from "./JoinedForum"

import React from 'react'







export default function ForumsContainer({ location, user }) {
    const { joinedForums, forums } = useForums({ user, location })
    const [otherForums, setOtherForums] = React.useState([])


    React.useEffect(() => {
        if (joinedForums && forums) {
            const joined = joinedForums.map(forum => forum.forum.id)
            const otherForums = forums.filter(forum => { return !joined.includes(forum.forum.id) })
            setOtherForums(otherForums)
        }

    }, [joinedForums, forums])

    
    return (
        <>

            {joinedForums && forums ?
                <>
                    <Text fontWeight={'medium'} fontSize={'xs'} color={'green.800'}>Joined Forums</Text>
                    <Divider my={1} />

                    {joinedForums.map(forum => <JoinedForumContainer key={forum.snapshot.id} forum={forum} user={user} />)}
                    <Button my={5} isFullWidth size={'xs'} variant={'ghost'} colorScheme={'green'} >See All</Button>



                    <Text fontWeight={'medium'} fontSize={'xs'} color={'green.800'}>Most Recent Forums</Text>
                    <Divider my={1} />

                    {otherForums.map(forum => <ForumContainer key={forum.snapshot.id} forum={forum} />)}
                    <Button my={5} isFullWidth size={'xs'} variant={'ghost'} colorScheme={'green'} >See All</Button>
                </>
                :
                <>
                    <Center p={5}>
                        <Spinner />
                    </Center>
                </>}


        </>
    )
}