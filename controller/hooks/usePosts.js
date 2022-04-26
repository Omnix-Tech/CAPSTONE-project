import React from 'react'
import { firestore } from '../../app/config/firebase.config'
import { doc, collection, query, where, orderBy, limit, getDocs, startAfter } from 'firebase/firestore'
import * as Scroll from 'react-scroll'

const MAX_GRAB = 10
const scroll = Scroll.animateScroll


const usePosts = (location) => {

    const [locationRef, setLocationRef] = React.useState(doc(firestore, `Locations/${location?.place_id}`))
    const collectionRef = collection(firestore, 'Post_Location')

    const [postsQuery, setPostQuery] = React.useState(query(
        collectionRef,
        where('location', '==', locationRef),
        where('isPublic', '==', true),
        orderBy('timeStamp', 'desc'),
        limit(MAX_GRAB)
    ))

    const [queryContent, setQuery] = React.useState(postsQuery)
    const [snapshot, setSnapshot] = React.useState(null)
    const [posts, setPosts] = React.useState(null)
    const [lastPost, setLastPost] = React.useState(null)
    const [allowRefresh, setAllowRefresh] = React.useState(false)



    const getThresholdPosts = async () => {
        const moreQuery = lastPost ? query(
            collectionRef,
            where('location', '==', locationRef),
            where('isPublic', '==', true),
            orderBy('timeStamp', 'desc'),
            startAfter(lastPost),
            limit(MAX_GRAB)
        ) : query(
            collectionRef,
            where('location', '==', locationRef),
            where('isPublic', '==', true),
            orderBy('timeStamp', 'desc'),
            limit(MAX_GRAB)
        )

        getDocs(moreQuery).then(querySnapshot => {
            const docs = querySnapshot.docs

            if (docs.length < MAX_GRAB) {
                setLastPost(null)
            } else {
                setLastPost(docs[docs.length - 1])
            }

            if (!snapshot && docs.length > 0) setSnapshot(querySnapshot)
            
            setPosts(posts ?
                [...posts, ...docs.map(doc => doc.data())]
                : docs.map(doc => doc.data()))
        })
    }

    const getInitialPosts = async () => {

        try {
            const querySnapshot = await getDocs(queryContent).catch(error => { console.log(error.message) })
            const docs = querySnapshot ? querySnapshot.docs : []


            if (docs.length > 0) setSnapshot(querySnapshot)
            setPosts(docs.map(doc => doc.data()))
            docs.length < MAX_GRAB ? setLastPost(null) : setLastPost(docs.length === 0 ? null : docs[docs.length - 1])


        } catch (error) { console.log(error) }

    }

    const handleRefresh = () => {
        const docs = snapshot.docs
        setPosts(docs.map(doc => doc.data()))
        lastPost ? setLastPost(docs[docs.length - 1]) : null
        setAllowRefresh(false)
        setTimeout(() => {
            scroll.scrollToTop()
        }, 500)

    }
    
    React.useEffect(() => {
        getInitialPosts()
    }, [])

    React.useEffect(() => {
        if (posts) {
            const postQuery = posts.length > 0 ? query(
                collectionRef,
                where('location', '==', locationRef),
                where('isPublic', '==', true),
                orderBy('timeStamp', 'desc'),
                limit(posts.length)
            ) : query(
                collectionRef,
                where('location', '==', locationRef),
                where('isPublic', '==', true),
                orderBy('timeStamp', 'desc'))
            setQuery(postQuery)
        }
    }, [posts])

    React.useEffect(() => {
        setLocationRef(doc(firestore, `Locations/${location?.place_id}`))
    }, [location])

    React.useEffect(() => {
        setPostQuery(query(
            collectionRef,
            where('location', '==', locationRef),
            where('isPublic', '==', true),
            orderBy('timeStamp', 'desc'),
            limit(MAX_GRAB)
        ))
    }, [locationRef])

    React.useEffect(() => {
        setQuery(postsQuery)
    }, [postsQuery])

    React.useEffect(() => {
        getInitialPosts()
    }, [])

    return {
        locationRef, postsQuery, queryContent, snapshot, posts, lastPost, allowRefresh, getThresholdPosts, handleRefresh
    }

}



export default usePosts