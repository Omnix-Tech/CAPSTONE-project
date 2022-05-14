import { Box, HStack, Text, Menu, MenuButton, MenuItem, MenuList, IconButton, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'

import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'
import Forum from "..";
import Link from "next/link";
import useForums from "../../../controller/hooks/useForums";
import { Remove } from "../../../controller/handlers";
import useFeedback from "../../../controller/hooks/useFeedback";


TimeAgo.addLocale(en)
const timeago = new TimeAgo('en-US')


export default function JoinedForumCard({ forum, user, location, limit }) {

    const { showError, showSuccess, render } = useFeedback()
    const { forum: doc } = useForums({ forum_id: forum.forum.id })

    const handleDeleteForum = () => {
        Remove(`/api/forum/${forum.forum.id}`)
        .then( res => showSuccess({message: 'Forum Removed'}))
        .catch( error => showError({message: 'Filed to Delete Forum'}))
    }


    const handleLeaveForum = () => {
        Remove(`/api/forum/user/${forum.forum.id}`)
        .then( res => showSuccess({message: 'Successfully left forum'}))
        .catch(error => showError({message: 'Something went wrong'}))
    }


    return (
        <>
        { render() }
            {doc ?
                <Box my={2} borderRadius={5} border={'1px'} borderColor={'gray.200'} p={3}>
                    <HStack justifyContent={'space-between'} alignItems={'center'}>
                        <Box>
                            <Link href={`/forum/${forum.forum.id}?${(new URLSearchParams({ connect: location?.place_id }).toString())}`} passHref>
                                <a>
                                    <Text fontWeight={'medium'} fontSize={'sm'} >{doc?.title}</Text>
                                </a>
                            </Link>

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
                                    <MenuItem onClick={() => handleDeleteForum()} fontSize={'sm'} >Delete Forum</MenuItem>
                                    :
                                    <MenuItem onClick={() => handleLeaveForum()} fontSize={'sm'} >Leave Forum</MenuItem>
                                }


                            </MenuList>
                        </Menu>
                    </HStack>

                    <Text my={4} noOfLines={2} fontSize={'xs'} >{doc?.description}</Text>

                    <Box mt={2}>



                        <Accordion allowToggle>
                            <AccordionItem>
                                <AccordionButton _focus={{outline: 'none', boxShadow: 'none'}} justifyContent={'space-between'} >
                                    <Text color={'linkedin.900'} fontSize={'xs'} fontWeight={'medium'}>Recent Activities</Text>
                                    <AccordionIcon />
                                </AccordionButton>

                                <AccordionPanel p={0}>
                                    <Forum user={user} forum={forum.forum.id} allowPagination={false} limit={limit} />
                                </AccordionPanel>
                            </AccordionItem>
                        </Accordion>


                    </Box>
                </Box>
                :
                <></>
            }

        </>
    )
}