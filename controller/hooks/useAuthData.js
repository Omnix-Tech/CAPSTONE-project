import { doc, getDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'

import { useAuthState } from "react-firebase-hooks/auth"
import { auth, firestore } from "../../app/config/firebase.config"


const useAuthData = () => {

    const [ user, loading ] = useAuthState(auth)
    const [ userDoc, setUserDoc ] = useState(null)

    const getUserData = () => {
        getDoc( doc(firestore, `/Users/${user.uid}`) )
        .then( snapshot => {
            setUserDoc({...snapshot.data(), id: snapshot.id})
        })
        .catch( err => console.log(err) )
    }


    useEffect(() => {
        if (user) {
            getUserData()
        }
    }, [user])

    return { user, loading, userDoc }
}


export default useAuthData