import React from 'react'

import { doc, getDoc, getDocs, query, collection, where, onSnapshot } from "@firebase/firestore"
import { firestore } from "../../app/config/firebase.config"

import { useRouter } from 'next/router'



const useConnect = (user) => {

    const [connects, setConnects] = React.useState([])
    const [connect, setConnect] = React.useState(null)
    const [connectDocument, setConnectDocument] = React.useState(null)
    const [connectsDocs, setConnectsDocs] = React.useState(null)
    const [error, setError] = React.useState(null)

    const router = useRouter()

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
            } else {
                    getDoc(doc(firestore, `User_Location/${user.uid}-${place}`))
                    .then( snapshot => {
                        setConnect(snapshot.data())
                    })
                    .catch( error => alert(error.message))
        
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

    const handleSetConnectsDocs = async () => {
        var docs = []
        for (var connectIndex = 0; connectIndex < connects.length; connectIndex++) {
            const snapshot = await getDoc(doc(firestore, `Locations/${connects[connectIndex].location.id}`)).catch(error => console.log(error))
            docs.push(snapshot.data())
        }
        setConnectsDocs(docs)
    }

    onSnapshot(query(
        collection(firestore, 'User_Location'),
        where('user', '==', doc(firestore, `Users/${user?.uid}`))
    ), querySnapshot => {
        if (querySnapshot.size !== connects.length) setConnects(querySnapshot.docs.map(doc => doc.data()))
    })

    React.useEffect(() => {
        if (user) handleSetUserConnects()
    }, [user])

    React.useEffect(() => {
        router.query.connect ? handleSetConnect(router.query.connect) : handleSetConnect()
        handleSetConnectsDocs()
    }, [connects])

    React.useEffect(() => {
        if (connect) handleSetConnectDocument()
    }, [connect])




    return {
        connect, connectDocument, connects, handleSetConnect, connectsDocs, error
    }
}



export default useConnect