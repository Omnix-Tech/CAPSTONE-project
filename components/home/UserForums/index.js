import { Box, Button, Center, Spinner, Text } from "@chakra-ui/react"
import useForums from "../../../controller/hooks/useForums"
import ForumContainer from "./UserForums"





export default function UserForumContainer({ user, setSelectedContent }) {

    const { createdForums } = useForums({ user })
    

    return (
        <>
            {createdForums ?
                <>
                    {createdForums.length === 0 ?
                        <>
                            <Center py={10}>
                                <Box>
                                    <Text fontWeight={'medium'} fontSize={'xs'} >{`You haven't created any forums`}</Text>
                                    <Button isFullWidth variant={'ghost'} colorScheme={'teal'} onClick={() => setSelectedContent(0)} my={2} size={'sm'}>Join / Visit a Forum</Button>
                                </Box>
                            </Center>
                        </>
                        :
                        <>
                            {createdForums.map(forum => <ForumContainer forum={forum} key={forum.snapshot.id} />)}
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