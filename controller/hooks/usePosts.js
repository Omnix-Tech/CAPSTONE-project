import React from 'react'
import { firestore } from '../../app/config/firebase.config'
import { doc, collection, query, where, orderBy, limit, getDocs, startAfter } from 'firebase/firestore'
import * as Scroll from 'react-scroll'

const MAX_GRAB = 3
const scroll = Scroll.animateScroll


const usePosts = ({ location, forum, isVisiting }) => {

    const [contentQuery, setContentQuery] = React.useState(null)
    const [posts, setPosts] = React.useState(null)
    const [lastPost, setLastPost] = React.useState(null)


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
    }, [contentQuery])


    return { posts, lastPost, getNextThresholdPosts }
}



export default usePosts