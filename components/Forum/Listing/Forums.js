import { Center, Spinner, Text, Divider, Button, Box } from "@chakra-ui/react"
import React from 'react'

import useForums from "../../../controller/hooks/useForums";
import ForumCard from "../components/ForumCard";
import JoinedForumCard from "../components/JoinedForumCard";


function Loading() {
    return (<Center px={5} py={10}><Spinner /></Center>)
}



export function OtherForums({ forums }) {


    return (
        <>
            <Text fontWeight={'medium'} fontSize={'xs'} color={'green.800'}>Forums</Text>
            <Divider my={1} />

            {forums.length === 0 ?
                <>
                    <Center py={5}>
                        <Box>
                            <Text fontWeight={'medium'} fontSize={'xs'} >{`No Forums are in this connect`}</Text>
                        </Box>
                    </Center>
                </>
                :
                <>
                    {forums.map(forum => <ForumCard key={forum.id} forum={forum} />)}
                    <Button my={5} isFullWidth size={'xs'} variant={'ghost'} colorScheme={'green'} >Load more</Button>
                </>
            }

        </>
    )
}


export function JoinedForums({ forums, user, location }) {
    return (
        <>
            <Text fontWeight={'medium'} fontSize={'xs'} color={'green.800'}>Joined Forums</Text>
            <Divider my={1} />

            {forums.length === 0 ?
                <>
                    <Center py={5}>
                        <Box>
                            <Text fontWeight={'medium'} fontSize={'xs'} >{`You haven't joined any forums`}</Text>
                        </Box>
                    </Center>
                </>
                :
                <>
                    {forums.map(forum => <JoinedForumCard key={forum.id} forum={forum} user={user} location={location} />)}
                    <Button my={5} isFullWidth size={'xs'} variant={'ghost'} colorScheme={'green'} >Load more</Button>
                </>
            }

        </>
    )
}


export default function Forums({ location, user, currentForum }) {
    const { joinedForums, forums } = useForums({ user, location })
    const [otherForums, setOtherForums] = React.useState(null)


    React.useEffect(() => {
        if (joinedForums && forums) {
            const joined = joinedForums.map(forum => forum.forum.id)
            const otherForums = forums.filter(forum => { return !joined.includes(forum.forum.id) })
            setOtherForums(otherForums)
        }

    }, [joinedForums, forums])

    return (
        <>
            {joinedForums ? <JoinedForums forums={currentForum ? joinedForums.filter(forum => forum.forum.id != currentForum) : joinedForums} user={user} location={location} /> : <Loading />}
            {otherForums ? <OtherForums forums={otherForums} /> : <Loading />}
        </>
    )
}
