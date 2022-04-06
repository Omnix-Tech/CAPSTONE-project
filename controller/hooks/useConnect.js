import React from 'react'

import { doc, getDoc, getDocs, query, collection, where } from "@firebase/firestore"
import { firestore } from "../../app/config/firebase.config"



const useConnect = (user) => {

    const [connects, setConnects] = React.useState([])
    const [connect, setConnect] = React.useState(null)
    const [connectDocument, setConnectDocument] = React.useState(null)
    const [error, setError] = React.useState(null)


    const handleSetUserConnects = () => {
        if (user) {
            getDocs(
                query(
                    collection(firestore, 'User_Location'),
                    where('user', '==', doc(firestore, `Users/${user?.uid}`))
                )
            )

                .then(querySnapshot => {
                    setConnects(querySnapshot.docs.map(doc => doc.data()))
                })

                .catch(error => setError({ status: 0, message: error.message }))
        }
    }

    const handleSetConnect = (place = null) => {
        if (connects.length !== 0) {
            if (!place) {
                setConnect(connects[0])
            }
        }
    }

    const handleSetConnectDocument = () => {
        if (connect) {
            getDoc(doc(firestore, `Locations/${connect.location.id}`))
                .then(snapshot => setConnectDocument(snapshot.data()))
                .catch(error => setError({ status: 0, message: error.message }))
        }
    }

    React.useEffect(() => {
        if (user) handleSetUserConnects()
    }, [user])

    React.useEffect(() => handleSetConnect(), [connects])

    React.useEffect(() => {
        if (connect) handleSetConnectDocument()
    }, [connect])



    return {
        connect, connectDocument, handleSetConnect, error
    }
}



export default useConnect