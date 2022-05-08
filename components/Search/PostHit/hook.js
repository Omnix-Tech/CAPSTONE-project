import React from 'react'

import { collection, doc, getDoc, getDocs, limit, query, where } from 'firebase/firestore'

import { firestore } from '../../../app/config/firebase.config'
import useForums from '../../../controller/hooks/useForums'

const usePostHit = ({ post, user, connect }) => {

    const postReference = doc(firestore, `Posts/${post.objectID}`)

    const [locationReference, setLocationReference] = React.useState(null)
    const [location, setLocation] = React.useState(null)
    const [access, setAccess] = React.useState(false)
    const { forum, joinedForums } = useForums({ forum_id: post.forum, user })


    const handleSetAccess = () => {
        const match = joinedForums.filter(joined => joined.forum.id === forum.id)
        match.length === 0 ? setAccess(false) : setAccess(true)
    }


    const handlePostLocation = () => {
        console.log(postReference)
        getDocs(
            query(collection(firestore, 'Post_Location'),
                where('post', '==', postReference),
                limit(1)
            ))
            .then(snap => {
                if (snap.size === 1) {
                    const doc = snap.docs[0].data()
                    console.log(doc)
                    setLocationReference(doc.location)
                }

            })
            .catch(error => {
                console.log(error)
            })
    }


    const handleSetLocationData = () => {
        getDoc(locationReference)
            .then(snap => {
                setLocation(snap.data())
                setAccess(true)
            })
            .catch(error => {
                console.log(error)
            })
    }


    React.useEffect(() => {
        if (!post.forum) handlePostLocation()
    }, [post])


    React.useEffect(() => {
        if (joinedForums && forum) handleSetAccess()
    }, [joinedForums, forum])



    React.useEffect(() => {
        if (locationReference) handleSetLocationData()
    }, [locationReference])



    return { access, forum, location, postReference }
}


export default usePostHit