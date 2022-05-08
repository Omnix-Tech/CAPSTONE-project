import React from 'react'


import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { firestore } from "../../app/config/firebase.config"



const useResponse = ({ post, id }) => {

    const [responseQuery, setResponseQuery] = React.useState(null)
    const [responses, setResponses] = React.useState(null)

    const handleSetResponses = () => {
        getDocs(responseQuery)
            .then(querySnapshot => {
                const docs = querySnapshot.docs
                setResponses(docs.map(doc => ({ ...doc.data(), id: doc.id })))
            })
            .catch(error => console.log(error))
    }

    const listenForUpdates = () => {
        onSnapshot(responseQuery, querySnapshot => {
            const docs = querySnapshot.docs
            setResponses(docs.map(doc => ({ ...doc.data(), id: doc.id })))
        })
    }


    React.useEffect(() => {
        setResponseQuery(query(
            collection(firestore, 'Responses'),
            where('post', '==', post),
            orderBy('timeStamp', 'asc')
        ))
    }, [post])


    React.useEffect(() => {
        if (responseQuery) handleSetResponses()
        if (responseQuery) listenForUpdates()
    }, [responseQuery])



    return { responses }
}


export default useResponse