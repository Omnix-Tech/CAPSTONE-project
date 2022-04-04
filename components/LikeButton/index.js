import React from 'react';

import { IconButton, Text } from '@chakra-ui/react';
import FeatherIcon from 'feather-icons-react'


import { likePost, unlikePost } from '../../controller/handlers'
import { doc, query, where, limit, collection, getDocs, onSnapshot } from 'firebase/firestore';
import { firestore } from '../../config/firebase.config';
import { useCollectionDataOnce } from 'react-firebase-hooks/firestore';


export default function LikeButton({ postRef: ref, currentUser }) {
    const likeQuery = query(
        collection(firestore, 'Likes'),
        where('user', '==', doc(firestore, `/Users/${currentUser?.uid}`)),
        where('post', '==', ref),
        limit(1)
    )

    const [liked, setLiked] = React.useState(false)
    const [likeCollection, loading, error, snapshot] = useCollectionDataOnce(likeQuery)
    const [likeSnapshot, setLikeSnapshot] = React.useState(null)

    const [likesCount, setLikesCount] = React.useState(0)


    const handleLikePost = async () => {
        const data = await likePost({ postId: ref.id, uid: currentUser.uid })
            .catch(error => { alert(error.message) })

        if (data.error) {
            alert('Something went wrong')
        } else {
            setLiked(true)
            const like = (await getDocs(likeQuery)).docs[0]
            setLikeSnapshot(like)
        }
    }
    const handleUnlikePost = async () => {

        const data = await unlikePost({ likeId: likeSnapshot.id })
        if (data.error) {
            alert('Something went wrong')
        } else {
            setLiked(false)
            setLikeSnapshot(null)
        }
    }
    const handleLikeClickEvent = async () => {
        if (likeSnapshot && liked) {
            await handleUnlikePost()
            return
        }
        await handleLikePost()
    }


    onSnapshot(
        query(
            collection(firestore, 'Likes'),
            where('post', '==', ref)), querySnapshot => {
                setLikesCount(querySnapshot.size)
            }
    )


    React.useEffect(() => {
        if (likeCollection) {
            if (likeCollection.length === 0) setLiked(false)
            if (likeCollection.length > 0) {
                setLikeSnapshot(snapshot.docs[0])
                setLiked(true)
            }
        }
    }, [likeCollection])






    return (

        <> {ref
            ?
            <>
                <IconButton onClick={handleLikeClickEvent} borderRadius={'full'} size={'sm'} variant={'ghost'} icon={<FeatherIcon color={liked ? 'blue' : 'unset'} size={18} icon='thumbs-up' />} />
                <Text>{likesCount}</Text>
            </>
            :
            <></>}

        </>
    );
}
