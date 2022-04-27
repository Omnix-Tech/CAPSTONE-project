import { Divider, HStack, Box, Text, Badge, Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react"
import FeatherIcon from 'feather-icons-react'
import useForums from "../../../controller/hooks/useForums"
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json'


TimeAgo.addLocale(en)
const timeago = new TimeAgo('en-US')

export default function ForumContainer({ forum }) {

    const { connects, participants } = useForums({ forum_id: forum.snapshot.id })


    return (
        <Box>

            <HStack alignContent={'center'} justifyContent={'space-between'} mb={5}>
                <Box>
                    <Text fontWeight={'medium'} fontSize={'sm'}>{forum.title}</Text>
                    <Text fontSize={'x-small'} color={'gray.700'}>Created {timeago?.format(forum?.timeStamp.toDate())}</Text>
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
                        <MenuItem fontSize={'sm'} >Edit Forum</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Text fontSize={'xs'} noOfLines={2} >{forum.description}</Text>


            <HStack mt={5}>
                <Badge colorScheme={'green'} fontSize={'x-small'} >{connects ? connects.length : 0} Connects</Badge>
                <Badge colorScheme={'linkedin'} fontSize={'x-small'} >{participants ? participants.length : 0} Participants</Badge>
            </HStack>

            <Divider my={4} />
        </Box>
    )
}