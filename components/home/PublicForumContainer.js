import React from 'react';
import { Box, Divider, Text, VStack, Spinner, HStack } from '@chakra-ui/react';
import Post from '../Post';
import { collection, doc, query, where, orderBy, onSnapshot, limit, startAfter, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebase.config';
import InfiniteScroll from 'react-infinite-scroll-component';


const MAX_GRAB = 4

export default function PublicForumContiner({ location, user: currentUser, ...props }) {

    const locationRef = doc(firestore, `Locations/${location?.place_id}`)
    const collectionRef = collection(firestore, 'Post_Location')
    const [queryContent, setQuery] = React.useState(query(
        collectionRef,
        where('location', '==', locationRef),
        where('isPublic', '==', true),
        orderBy('timeStamp', 'desc'),
        limit(MAX_GRAB)
    ))

    const [snapshot, setSnapshot] = React.useState(null)
    const [posts, setPosts] = React.useState(null)
    const [lastPost, setLastPost] = React.useState(null)

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
            const querySnapshot = await getDocs(queryContent).catch(error => { throw error })
            const docs = querySnapshot.docs


            if (docs.length > 0) setSnapshot(querySnapshot)
            setPosts(docs.map(doc => doc.data()))
            setLastPost(docs.length === 0 ? null : docs[docs.length - 1])


        } catch (error) { console.log(error) }

    }

    React.useState(() => {
        if (posts) {
            setQuery(query(
                collectionRef,
                where('location', '==', locationRef),
                where('isPublic', '==', true),
                orderBy('timeStamp', 'desc'),
                limit(posts.length)
            ))
        }
    }, [posts])


    React.useEffect(() => {
        getInitialPosts()
    }, [])


    onSnapshot(queryContent, (querySnapshot) => {
        if (snapshot) {
            const docs = querySnapshot.docs
            if (docs.length > 0) {
                if (snapshot?.docs[0].id !== docs[0].id) {
                    setPosts(docs.map(doc => doc.data()))
                    setSnapshot(querySnapshot)
                    setLastPost(docs[docs.length - 1])
                }
            }

        }

    })

    return (
        <Box {...props}>

            <Text px={5} color={'gray.400'} fontWeight={'medium'} textTransform={'uppercase'} fontSize={'xs'}>{location?.area} Forum</Text>
            <Divider my={2} />


            <Box h={'full'} borderRight={'1px'} borderLeft={'1px'} borderLeftColor={'gray.300'} borderRightColor={'gray.300'}>
                {posts === null ?
                    <VStack h={'50vh'} justifyContent={'center'} alignContent={'center'} >
                        <Spinner />
                    </VStack>
                    : posts.length === 0
                        ?
                        <HStack paddingY={10} width={'full'} justifyContent={'center'}><Text color={'gray.400'} fontSize={'x-small'}>{(`No Posts`).toUpperCase()}</Text></HStack>
                        :

                        <InfiniteScroll
                            dataLength={posts.length}
                            next={getThresholdPosts}
                            hasMore={lastPost !== null}
                            loader={<HStack paddingY={20} width={'full'} justifyContent={'center'}><Spinner size='lg' /></HStack>}
                            endMessage={<HStack paddingY={2} width={'full'} justifyContent={'center'}><Text color={'gray.400'} fontSize={'x-small'}>{(`That's it`).toUpperCase()}</Text></HStack>}
                        >
                            {posts.map(post => {
                                return <Post key={post.post.id} postRef={post?.post} currentUser={currentUser} />
                            })}
                        </InfiniteScroll>
                }
            </Box>
        </Box>
    );
}


