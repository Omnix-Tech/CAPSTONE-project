import React from 'react';

import { useDisclosure } from '@chakra-ui/react'
import { useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { firestore } from '../../config/firebase.config';
import PostCard from './PostCard';
import PostContainer from './PostContainer';



export default function Post({ postRef, currentUser }) {
    const filesQuery = query(
        collection(firestore, 'Files'),
        where('post', '==', postRef)
    )

    const [files, fileLoading] = useCollectionDataOnce(filesQuery)
    const [ref, setRef] = React.useState(postRef)
    const [post, loading] = useDocumentData(ref)
    const [user] = useDocumentData(post?.user)

    React.useEffect(() => {
        setRef(postRef)
    }, [postRef])




    const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
    const postModalToggle = React.useRef()

    const modalOptions = { isOpen, onClose, finalFocusRef: postModalToggle }
    return (
        <>
            <PostCard
                onOpen={onOpen}
                files={files}
                post={post}
                user={user}
                currentUser={currentUser}
                loading={loading}
                fileLoading={fileLoading}
                postRef={postRef} />
            <PostContainer
                {...modalOptions}
                files={files}
                post={post}
                user={user}
                currentUser={currentUser}
                loading={loading}
                fileLoading={fileLoading}
                postRef={postRef}
            />
        </>

    );
}
