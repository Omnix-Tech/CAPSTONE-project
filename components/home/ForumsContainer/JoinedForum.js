import { Box, HStack, Text, Menu, MenuButton, MenuItem, MenuList, IconButton, Divider } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'


import { useDocumentData } from "react-firebase-hooks/firestore"
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'


TimeAgo.addLocale(en)
const timeago = new TimeAgo('en-US')

export default function JoinedForumContainer({ forum }) {

    const [doc, loading] = useDocumentData(forum.forum)
    return (
        <>
            {doc ?
                <Box my={2} borderRadius={5} border={'1px'} borderColor={'gray.200'} p={3}>
                    <HStack justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                            <Text fontWeight={'medium'} fontSize={'sm'} >{doc?.title}</Text>
                            {forum.status === 'Owner' ?
                                <Text fontSize={'x-small'} color={'gray.700'}>You created the forum {doc ? timeago.format(forum?.timeStamp.toDate()) : ''}</Text>
                                :
                                <Text fontSize={'x-small'} color={'gray.700'}>Joined {doc ? timeago.format(forum?.timeStamp.toDate()) : ''}</Text>}


                        </Box>

                        <Menu placement={'bottom-end'}>
                            <MenuButton
                                as={IconButton}
                                icon={<FeatherIcon size={15} icon={'more-vertical'} />}
                                variant={'ghost'}
                                size={'xs'}
                                borderRadius={'full'}
                            />
                            <MenuList zIndex={'popover'}>
                                {forum.status === 'Owner' ?
                                    <MenuItem fontSize={'sm'} >Delete Forum</MenuItem>
                                    :
                                    <MenuItem fontSize={'sm'} >Leave Forum</MenuItem>
                                }


                            </MenuList>
                        </Menu>
                    </HStack>

                    <Text my={4} noOfLines={2} fontSize={'xs'} >{doc?.description}</Text>

                    <Box mt={2}>
                        <Text color={'linkedin.900'} fontSize={'xs'} fontWeight={'medium'}>Most Recent Activities</Text>
                        <Divider mb={2} />
                    </Box>
                </Box>
                :
                <></>
            }

        </>

    )
}