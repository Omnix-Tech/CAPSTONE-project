import React from 'react';

import { useDisclosure } from '@chakra-ui/react'
import { useCollectionDataOnce, useDocumentData } from 'react-firebase-hooks/firestore';
import { collection, query, where } from 'firebase/firestore';
import { firestore } from '../../app/config/firebase.config';
import PostCard from './PostCard';
import PostContainer from './PostContainer';



export default function Post({ postRef, currentUser, render }) {
    const filesQuery = query(
        collection(firestore, 'Files'),
        where('post', '==', postRef)
    )

    const [files, fileLoading] = useCollectionDataOnce(filesQuery)
    const [ref, setRef] = React.useState(postRef)
    const [post, loading] = useDocumentData(ref)
    const [user] = useDocumentData(post?.user)


    const defaultRender = () => (
        <PostCard
            onOpen={onOpen}
            files={files}
            post={post}
            user={user}
            currentUser={currentUser}
            loading={loading}
            fileLoading={fileLoading}
            postRef={postRef}
        />
    )


    React.useEffect(() => {
        setRef(postRef)
    }, [postRef])




    const { isOpen, onOpen, onClose } = useDisclosure()
    const postModalToggle = React.useRef()
    const modalOptions = { isOpen, onClose, finalFocusRef: postModalToggle }





    return (
        <>
            {render ? render({ onOpen }) : defaultRender()}
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
