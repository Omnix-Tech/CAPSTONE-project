import { useDisclosure } from '@chakra-ui/react'
import { getDoc } from 'firebase/firestore'
import React from 'react'
import useFeedback from '../../../controller/hooks/useFeedback'


import useForums from "../../../controller/hooks/useForums"


const useForumHit = ({ forumObj, connect, user }) => {

    const { forums, joinedForums, forum, connects, participants } = useForums({ user, location: connect, forum_id: forumObj.objectID })
    const [ isJoined, setIsJoined ] = React.useState(null)
    const [ owner, setOwner ] = React.useState(null)

    const { showError, showSuccess } = useFeedback()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const modalRef = React.useRef()


    const handleSetIsJoined = () => {
        if (joinedForums.filter(joined => joined.forum.id === forum.id).length > 0) {
            setIsJoined(true)
        } else if (forums.filter(forumObj => forumObj.forum.id === forum.id).length > 0) {
            setIsJoined(false)
        } else {
            setIsJoined(null)
        }
    }

    const handleSetUser = () => {
        getDoc(forum.owner)
            .then(snapshot => setOwner(snapshot.data()))
    }

    React.useEffect(() => {
        if (forum && forums && joinedForums) handleSetIsJoined()
    }, [forum, forums, joinedForums])


    React.useEffect(() => {
        if (forum) handleSetUser()
    }, [forum])


    return { forum, showError, showSuccess, isOpen, onClose, modalRef, connects, participants, owner, isJoined, onOpen }
    
}


export default useForumHit