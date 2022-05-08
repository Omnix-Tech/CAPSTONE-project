import React from 'react';
import { Box, Divider, Input, InputGroup, InputRightAddon, Text, IconButton, ButtonGroup, Button, HStack } from '@chakra-ui/react';

import FeatherIcon from 'feather-icons-react'


import { Hits, InstantSearch, useSearchBox } from 'react-instantsearch-hooks-web';
import algoliasearch from 'algoliasearch/lite';
import PostHit from './PostHit';
import ForumHit from './ForumHit';


const searchClient = algoliasearch("O8SH3P6ER7", "4b0458304aa734e96cf20121408b0065")


const styles = {
    Input: {
        variant: 'filled',
        borderRadius: 0,
        bgColor: 'rgba(255,255,255,0.1)',
        textColor: 'white',

        _hover: {
            bgColor: 'rgba(255,255,255,0.2)'
        },

        _active: {
            borderColor: 'white'
        },

        _focus: {
            borderColor: 'white'
        }
    },
    Card: {
        bgColor: 'rgba(255,255,255,0.1)'
    }
}


function Hit({ hit, index, user, connect }) {
    return (

        <>
            {
                index.includes('posts') ?
                    <PostHit post={hit} user={user} />
                    : index.includes('forums') ?
                        <ForumHit forumObj={hit} connect={connect} user={user} />
                        :
                        <>
                        </>
            }
        </>
    )
}


function SearchComponent(props) {
    const { query, refine, clear, isSearchStalled } = useSearchBox(props)
    const [search, setSearch] = React.useState("")
    return (
        <>
            <InputGroup>
                <Input {...styles.Input} placeholder={'Search'} value={search} onChange={e => setSearch(e.target.value)} />
                <InputRightAddon border={'none'} {...styles.Input} >
                    <IconButton onClick={() => refine(search)} variant={'ghost'} colorScheme={'whiteAlpha'} borderRadius={'full'} >
                        <FeatherIcon icon={'search'} />
                    </IconButton>
                </InputRightAddon>
            </InputGroup>
        </>
    )
}



export default function SearchContainer({ user, connect, ...props }) {

    const [index, setIndex] = React.useState("weconnect_forums")

    return (
        <Box {...props} borderLeftRadius={10} overflow={'hidden'} h={'full'} bgPosition={'center !important'} bgSize={'cover !important'} w={'100%'} bg={`url('/images/bg.jpg')`} >
            <Box bg={'rgba(0,0,0,0.6)'} backdropFilter={'blur(10px)'} h={'full'}>

                <ButtonGroup justifyContent={'center'} width={'full'} variant={'ghost'} colorScheme={'whiteAlpha'}>
                    <Button disabled={'weconnect_forums' === index} onClick={() => setIndex('weconnect_forums')} borderRadius={0}>Forums</Button>
                    <Button disabled={'weconnect_posts' === index} onClick={() => setIndex('weconnect_posts')} borderRadius={0}>Posts</Button>
                </ButtonGroup>


                <InstantSearch searchClient={searchClient} indexName={index} >
                    <SearchComponent />
                    <Box  {...styles.Card}>
                        <Hits hitComponent={(props) => <Hit {...props} index={index} user={user} connect={connect} />} />
                    </Box>
                </InstantSearch>
            </Box>


        </Box>
    );
}
