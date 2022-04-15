import React from 'react';

import { HStack, IconButton, Text } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'


import { likePost, unlikePost } from '../../controller/handlers'
import { doc, query, where, limit, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../app/config/firebase.config';
import { AlertContext } from '../../controller/context';


export default function LikeButton({ postRef: ref, currentUser }) {
    const { alert: createAlert } = React.useContext(AlertContext)


    const likeQuery = query(
        collection(firestore, 'Likes'),
        where('user', '==', doc(firestore, `/Users/${currentUser?.uid}`)),
        where('post', '==', ref),
        limit(1)
    )

    const [liked, setLiked] = React.useState(false)
    const [likeSnapshot, setLikeSnapshot] = React.useState(null)
    const [likesCount, setLikesCount] = React.useState(0)


    const handleLikePost = async () => {
        const data = await likePost({ postId: ref.id, uid: currentUser.uid })
            .catch(error => { createAlert({ message: error.message, status: 'error' }) })

        if (data.error) {
            createAlert({ messege: 'Something went wrong', status: 'error' })
        } else {
            setLiked(true)
            const like = (await getDocs(likeQuery)).docs[0]
            setLikeSnapshot(like)
            createAlert({ heading: 'Liked', status: 'success' })
        }
    }
    const handleUnlikePost = async () => {

        const data = await unlikePost({ likeId: likeSnapshot.id })
        if (data.error) {
            createAlert({ messege: 'Something went wrong', status: 'error' })
        } else {
            setLiked(false)
            setLikeSnapshot(null)
            createAlert({ heading: 'Unliked', status: 'success' })
        }
    }
    const handleLikeClickEvent = async () => {
        if (likeSnapshot && liked) {
            await handleUnlikePost()
            return
        }
        await handleLikePost()
    }
    const listenForLikes = () => {
        onSnapshot(
            query(
                collection(firestore, 'Likes'),
                where('post', '==', ref)
            ), querySnapshot => {
                if (likesCount != querySnapshot.size) setLikesCount(querySnapshot.size)
            }
        )
    }


    const listenForUpdates = () => {
        onSnapshot(likeQuery, querySnapshot => {
            const docs = querySnapshot.docs
            if (docs.length === 0) setLiked(false)
            if (docs.length > 0) {
                setLikeSnapshot(docs[0])
                setLiked(true)
            }
        })
    }

    React.useEffect(() => {
        listenForUpdates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        listenForLikes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likesCount])






    return (

        <HStack my={2} > {ref
            ?
            <>
                <IconButton colorScheme={liked ? 'green' : 'blackAlpha'} onClick={handleLikeClickEvent} borderRadius={'full'} size={'xs'} variant={liked ? 'solid' : 'ghost'} icon={<FeatherIcon size={14} icon='thumbs-up' />} />
                <Text fontSize={'xs'} >{likesCount}</Text>
            </>
            :
            <></>}

        </HStack>
    );
}
