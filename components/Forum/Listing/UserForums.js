import { Box, Button, Center, Spinner, Text } from "@chakra-ui/react"

import useForums from "../../../controller/hooks/useForums";
import UserForumCard from "../components/UserForumCard";


export default function UserForums({ user, location, setSelectedContent }) {
    const { createdForums } = useForums({ user })

    return (
        <>
            {createdForums ?
                <>
                    {createdForums.length === 0 ?
                        <>
                            <Center py={10}>
                                {setSelectedContent ?
                                    <Box>
                                        <Text fontWeight={'medium'} fontSize={'xs'} >{`You haven't created any forums`}</Text>
                                        <Button isFullWidth variant={'ghost'} colorScheme={'teal'} onClick={() => setSelectedContent(0)} my={2} size={'sm'}>Join / Visit a Forum</Button>
                                    </Box>
                                    :
                                    <Text fontWeight={'medium'} fontSize={'xs'} >No Forums</Text>
                                }

                            </Center>
                        </>
                        :
                        <>
                            {createdForums.map(forum => <UserForumCard location={location} forum={forum} key={forum.id} />)}
                        </>

                    }
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
