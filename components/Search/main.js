import React from 'react'

import algoliasearch from "algoliasearch"
import { Hits, InstantSearch, useSearchBox } from 'react-instantsearch-hooks-web'
import { Box, Input, InputGroup, Text, InputAddon, IconButton, Tooltip, HStack } from '@chakra-ui/react'


import FeatherIcon from 'feather-icons-react'
import MainPostHit from './PostHit/main'
import MainForumHit from './ForumHit/main'
import ConnectMenu from '../ConnectMenu'

const searchClient = algoliasearch("O8SH3P6ER7", "4b0458304aa734e96cf20121408b0065")

const styles = {
    Card: {
        background: 'white',
        p: 10,
        borderRadius: 10
    },
    Input: {
        variant: 'unstyled'
    }
}

function Hit({ hit, index, user, connect }) {
    return (

        <>
            {
                index.includes('posts') ?
                    <MainPostHit post={hit} user={user} connect={connect} />
                    : index.includes('forums') ?
                        <MainForumHit forumObj={hit} connect={connect} user={user} />
                        :
                        <></>
            }
        </>
    )
}


function SearchComponent(props) {
    const { query, refine, clear, isSearchStalled } = useSearchBox(props)


    return (
        <Box  {...styles.Card}>
            <InputGroup>
                <Input {...styles.Input} placeholder={'Search'} onChange={e => refine(e.target.value)} />

                <InputAddon bg={'transparent'} border={'none'}>
                    <IconButton variant={'ghost'} colorScheme={'green'} borderRadius={'full'} icon={<FeatherIcon icon={'search'} />} />
                </InputAddon>
            </InputGroup>
        </Box>
    )
}


export default function SearchMainContainer({ user, connect, connectsDocs }) {


    const [index, setIndex] = React.useState("weconnect_forums")

    return (
        <>
            <Box my={5}>
                <HStack>
                    <Box>
                        <Tooltip label={'Search Forums'}>
                            <IconButton variant={'ghost'} colorScheme={'green'} borderRadius={'full'} disabled={'weconnect_forums' === index} onClick={() => setIndex('weconnect_forums')} icon={<FeatherIcon size={20} icon={'message-circle'} />} />
                        </Tooltip>
                        <Tooltip label={'Search Posts'}>
                            <IconButton variant={'ghost'} colorScheme={'green'} borderRadius={'full'} disabled={'weconnect_posts' === index} onClick={() => setIndex('weconnect_posts')} icon={<FeatherIcon size={20} icon={'users'} />} />
                        </Tooltip>
                    </Box>
                    <Text fontWeight={'medium'} fontSize={'sm'} >{`${connect?.area} Connect`}</Text>
                    <ConnectMenu connectsDocs={connectsDocs} />
                </HStack>

            </Box>

            <Box my={5}>
                <InstantSearch searchClient={searchClient} indexName={index}>
                    <SearchComponent />

                    <Box mt={10}>
                        <Hits hitComponent={(props) => <Hit {...props} index={index} user={user} connect={connect} />} />
                    </Box>
                </InstantSearch>
            </Box>

        </>
    )
}