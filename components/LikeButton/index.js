import React from 'react';

import { HStack, IconButton, Text } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'
import useLikes from '../../controller/hooks/useLikes';


export default function LikeButton({ postRef: ref, currentUser }) {

    const { likeCount, liked, handleLikePost, handleUnlikePost, render } = useLikes({ currentUser, ref })

    return (

        <>

            <HStack my={2} > {ref
                ?
                <>
                    <IconButton colorScheme={liked ? 'green' : 'blackAlpha'} onClick={() => { liked ? handleUnlikePost() : handleLikePost() }} borderRadius={'full'} size={'xs'} variant={ liked ? 'solid' : 'ghost'} icon={<FeatherIcon size={14} icon='thumbs-up' />} />
                    <Text fontSize={'xs'} >{likeCount}</Text>
                </>
                :
                <></>}

            </HStack>
            
            { render() }

        </>
    );
}
