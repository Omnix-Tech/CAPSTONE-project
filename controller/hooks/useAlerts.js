import React from 'react'
import useAPIs from '../handlers'


import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore'
import { firestore } from '../../app/config/firebase.config'



const useAlerts = (connect) => {
    const { server } = useAPIs()

    const [alerts, setAlerts] = React.useState(null)
    const [refresh, setRefresh] = React.useState(false)
    const [app_data, setAppData] = React.useState({})


    const listenForUpdates = () => {
        onSnapshot(doc(firestore, 'AppData/WE_CONNECT'), snapshot => {
            if (snapshot.exists()) {
                setAppData(snapshot.data())
            }
        })
    }

    const handleSetAppData = () => {
        getDoc( doc( firestore,  '/AppData/WE_CONNECT') ).then(snapshot => {
            if (snapshot.exists()) {
                setAppData(snapshot.data())
            } else {
                handleRefreshAlerts()
            }
            
        }).catch(error => { console.log(error)})
    }


    const handleSetRefresh = () => {
        console.log(app_data)
    }

    const handleSetAlerts = () => {
        getDocs(
            collection( firestore, 'Alerts' )
        )
        .then( snapshot => {
            const docs = snapshot.docs
            setAlerts(docs.map( doc => doc.data() ))
        })
        .catch( error => {
            setAlerts([])
            console.log('Error Occurred')
        })
    }


    const handleRefreshAlerts = () => {
        console.log('running...')


        server().post('/api/refreshAlerts', {
            currentBatch: app_data ? app_data.currentBatch : null,
            lastBatch: app_data ? app_data.lastBatch : null
        })
            .then(response => response.data)
            .then(data => {
                if (data.error) {
                    console.log('Something went wrong: ', data.error)
                } else {
                    console.log(data)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }


    React.useEffect(() => {
        handleSetAppData()
        listenForUpdates()
    }, [])


    React.useEffect(() => {
        if (app_data) handleSetRefresh()
    }, [app_data])


    React.useEffect(() => {
        if (app_data) handleSetAlerts()
    }, [app_data])


    return { alerts }

}


export default useAlerts