import React from 'react'


import { firestore } from '../../app/config/firebase.config'
import { onSnapshot, query, collection, where, doc, limit, getDocs } from 'firebase/firestore'
import useFeedback from './useFeedback'
import useAPIs from '../handlers'





const useLikes = ({ ref, currentUser }) => {
    const { Post, Remove } = useAPIs()

    const { showError, showSuccess, render } = useFeedback()
    const [liked, setLiked] = React.useState(false)
    const [snapshot, setSnapshot] = React.useState(null)
    const [likeCount, setLikeCount] = React.useState(0)


    const listenForLikes = () => {
        onSnapshot(
            query(
                collection(firestore, 'Likes'),
                where('post', '==', ref)
            ), querySnapshot => {
                if (likeCount != querySnapshot.size) setLikeCount(querySnapshot.size)
            }
        )
    }

    const listenForUpdates = () => {
        onSnapshot(
            query(
                collection(firestore, 'Likes'),
                where('user', '==', doc(firestore, `/Users/${currentUser?.uid}`)),
                where('post', '==', ref),
                limit(1)
            ), querySnapshot => {
                const docs = querySnapshot.docs
                if (docs.length === 0) setLiked(false)
                if (docs.length > 0) {
                    setLiked(true)
                    setSnapshot(docs[0])
                }
            })
    }

    const handleLikePost = () => {
        Post(`api/like`, { uid: currentUser.uid, postId: ref.id })
            .then(async res => {
                const snapshot = (await query(
                    collection(firestore, 'Likes'),
                    where('user', '==', doc(firestore, `/Users/${currentUser?.uid}`)),
                    where('post', '==', ref),
                    limit(1)
                ))[0]

                setLiked(true)
                setSnapshot(snapshot)
                showSuccess({ message: 'Liked' })
            })
            .catch(error => {
                showError({ message: error.message })
            })
    }


    const handleUnlikePost = () => {
        Remove(`/api/like/${snapshot.id}`)
            .then(res => {
                setLiked(false)
                setSnapshot(null)
                showSuccess({ message: 'Unliked' })
            })
            .catch(error => showError({ message: 'Something went wrong' }))
    }


    React.useEffect(() => {
        listenForUpdates()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        listenForLikes()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [likeCount])






    return { liked, likeCount, snapshot, handleLikePost, handleUnlikePost, render }
}


export default useLikes;