import React from 'react';

import { HStack, IconButton, Text } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'


import useAPIs from '../../controller/handlers'
import { doc, query, where, limit, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../app/config/firebase.config';
import useFeedback from '../../controller/hooks/useFeedback';


export default function LikeButton({ postRef: ref, currentUser }) {
    const { unlikePost, likePost } = useAPIs()
    const { showError, showSuccess, render } = useFeedback()


    const likeQuery = query(
        collection(firestore, 'Likes'),
        where('user', '==', doc(firestore, `/Users/${currentUser?.uid}`)),
        where('post', '==', ref),
        limit(1)
    )

    const [likeState, setLikeState] = React.useState({
        liked: false, likeSnapshot: null, likesCount: 0
    })

    const handleLikePost = async () => {
        const data = await likePost({ postId: ref.id, uid: currentUser.uid })
            .catch(error => { showError({ message: error.message }) })

        if (data.error) {
            showError({ message: 'Something went wrong' })
        } else {
            const like = (await getDocs(likeQuery)).docs[0]
            setLikeState({ ...likeState, liked: true, likeSnapshot: like })
            showSuccess({ message: 'Liked' })
        }
    }

    const handleUnlikePost = async () => {
        const data = await unlikePost({ likeId: likeState?.likeSnapshot.id })
        if (data.error) {
            showError({ message: 'Something went wrong' })
        } else {
            setLikeState({ ...likeState, liked: false, likeSnapshot: null })
            showSuccess({ message: 'Unliked' })
        }
    }

    const handleLikeClickEvent = async () => {
        if (likeState.likeSnapshot && likeState.liked) {
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
                if (likeState.likesCount != querySnapshot.size) setLikeState({ ...likeState, likesCount: querySnapshot.size })
            }
        )
    }


    const listenForUpdates = () => {
        onSnapshot(likeQuery, querySnapshot => {
            const docs = querySnapshot.docs
            if (docs.length === 0) setLikeState({ ...likeState, liked: false })
            if (docs.length > 0) {
                setLikeState({ ...likeState, liked: true, likeSnapshot: docs[0] })
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
    }, [likeState.likesCount])


    return (

        <>

            <HStack my={2} > {ref
                ?
                <>
                    <IconButton colorScheme={likeState.liked ? 'green' : 'blackAlpha'} onClick={handleLikeClickEvent} borderRadius={'full'} size={'xs'} variant={likeState.liked ? 'solid' : 'ghost'} icon={<FeatherIcon size={14} icon='thumbs-up' />} />
                    <Text fontSize={'xs'} >{likeState.likesCount}</Text>
                </>
                :
                <></>}

            </HStack>
            
            { render() }

        </>
    );
}
