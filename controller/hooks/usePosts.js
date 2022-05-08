import React from 'react'
import { firestore } from '../../app/config/firebase.config'
import { doc, collection, query, where, orderBy, limit, getDocs, startAfter, onSnapshot } from 'firebase/firestore'
import * as Scroll from 'react-scroll'

var MAX_GRAB = 3
const scroll = Scroll.animateScroll


const usePosts = ({ location, forum, isVisiting, contentLimit }) => {

    MAX_GRAB = contentLimit ? contentLimit : MAX_GRAB

    const [contentQuery, setContentQuery] = React.useState(null)
    const [posts, setPosts] = React.useState(null)
    const [lastPost, setLastPost] = React.useState(null)
    const [postUpdates, setPostUpdates] = React.useState(null)


    const updatePost = (allowScroll = true) => {
        postUpdates.size < MAX_GRAB ? setLastPost(null) : setPosts(postUpdates.docs[postUpdates.size - 1])
        setPosts( postUpdates.docs.map( doc => doc.data() ))
        setPostUpdates(null)
        allowScroll ? scroll.scrollToTop() : null
    }


    const listenForUpdates = () => {
        onSnapshot(contentQuery, querySnapshot => {
            setPostUpdates(querySnapshot)
        })
    }

    const getInitialPosts = () => {
        getDocs(contentQuery)
            .then(querySnapshot => {

                const docs = querySnapshot.docs
                querySnapshot.size < MAX_GRAB ? setLastPost(null) : setLastPost(docs[querySnapshot.size - 1])
                setPosts(docs.map(doc => doc.data()))

            })
            .catch(error => { throw error })
    }

    const getNextThresholdPosts = () => {
        getDocs(query(contentQuery, startAfter(lastPost)))
            .then(querySnapshot => {
                const docs = querySnapshot.docs
                querySnapshot.size < MAX_GRAB ? setLastPost(null) : setLastPost(docs[querySnapshot.size - 1])
                setPosts(posts ? [...posts, ...docs.map(doc => doc.data())] : docs.map(doc => doc.data()))
            })
    }


    React.useEffect(() => {
        
        if (location) {
            isVisiting ?
                setContentQuery(
                    query(collection(firestore, 'Post_Location'),
                        where('location', '==', doc(firestore, `Locations/${location?.place_id}`)),
                        where('isPublic', '==', true),
                        orderBy('timeStamp', 'desc'),
                        limit(MAX_GRAB))
                )
                :
                setContentQuery(
                    query(collection(firestore, 'Post_Location'),
                        where('location', '==', doc(firestore, `Locations/${location?.place_id}`)),
                        orderBy('timeStamp', 'desc'),
                        limit(MAX_GRAB))
                )
        }

        if (forum) {
            setContentQuery(
                query(collection(firestore, 'Forum_Post'),
                    where('forum', '==', doc(firestore, `Forums/${forum}`)),
                    orderBy('timeStamp', 'desc'),
                    limit(MAX_GRAB)
                )
            )
        }

    }, [forum, location, isVisiting])


    React.useEffect(() => {
        if (contentQuery) getInitialPosts()
        if (contentQuery) listenForUpdates()
    }, [contentQuery])


    return { posts, lastPost, getNextThresholdPosts, postUpdates, updatePost }
}



export default usePosts