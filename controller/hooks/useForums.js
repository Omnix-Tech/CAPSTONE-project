import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import React from 'react'
import { firestore } from '../../app/config/firebase.config'


const useForums = ({ user, forum_id, location }) => {

    const [createdForums, setCreatedForums] = React.useState(null)
    const [connects, setConnects] = React.useState(null)
    const [participants, setParticipants] = React.useState(null)
    const [joinedForums, setJoinedForums] = React.useState(null)
    const [forums, setForums] = React.useState(null)

    const handleSetCreatedForums = () => {
        getDocs(
            query(collection(firestore, 'Forums'), where('owner', '==', doc(firestore, `/Users/${user.uid}`)))
        ).then(querySnapshot => {
            const docs = querySnapshot.docs
            setCreatedForums(docs.map(doc => ({ ...doc.data(), snapshot: doc })))
        })
    }

    const handleSetConnects = () => {
        getDocs(
            query(collection(firestore, 'Forum_Location'), where('forum', '==', doc(firestore, `/Forums/${forum_id}`)))
        ).then(querySnapshot => {
            const docs = querySnapshot.docs
            setConnects(docs.map(doc => doc.data()))
        })
    }

    const handleSetParticipants = () => {
        getDocs(
            query(collection(firestore, 'User_Forum'), where('forum', '==', doc(firestore, `/Forums/${forum_id}`)))

        ).then(querySnapshot => {
            const docs = querySnapshot.docs
            setParticipants(docs.map(doc => ({ ...doc.data(), snapshot: doc })))
        })

    }

    const handleSetJoinedForums = () => {
        getDocs(
            query(collection(firestore, 'User_Forum'), where('user', '==', doc(firestore, `/Users/${user.uid}`)))
        ).then(querySnapshot => {
            const docs = querySnapshot.docs
            setJoinedForums(docs.map(doc => ({ ...doc.data(), snapshot: doc })))
        })
    }

    const handleSetForums = () => {
        getDocs(
            query(
                collection(firestore, 'Forum_Location'),
                where('location', '==', doc(firestore, `/Locations/${location.place_id}`))
            )
        )
            .then(querySnapshot => {
                const docs = querySnapshot.docs
                setForums(docs.map(doc => ({ ...doc.data(), snapshot: doc })))
            })
    }





    React.useEffect(() => {
        if (user) handleSetCreatedForums()
        if (user) handleSetJoinedForums()
    }, [user])


    React.useEffect(() => {
        if (forum_id) handleSetConnects()
        if (forum_id) handleSetParticipants()
    }, [forum_id])


    React.useEffect(() => {
        if (location) handleSetForums()
    }, [location])



    return { joinedForums, createdForums, connects, participants, forums }
}



export default useForums