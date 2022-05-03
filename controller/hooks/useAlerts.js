import React from 'react'
import useAPIs from '../handlers'


import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore'
import { firestore } from '../../app/config/firebase.config'



const useAlerts = (connect) => {
    const { server } = useAPIs()

    const [alertLocation, setAlertLocation] = React.useState(null)
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
        getDoc(doc(firestore, '/AppData/WE_CONNECT')).then(snapshot => {
            if (snapshot.exists()) {
                setAppData(snapshot.data())
            } else {
                handleRefreshAlerts()
            }

        }).catch(error => { })
    }

    const handleSetRefresh = () => {
        const time = app_data.lastRefresh

        if (time) {
            const refreshTime = new Date(
                time.seconds * 1000 + time.nanoseconds / 1000000
            )
            const now = (new Date()).getTime()
            const refreshTimeInMLSeconds = refreshTime.getTime()

            const difference = refreshTimeInMLSeconds - (now - 900000)
            console.log('Difference: ', difference)
            setRefresh(difference <= 0)
        }

    }

    const handleSetAlertLocation = () => {
        const alertQuery = query(
            collection(firestore, 'AlertLocation'),
            where('location', '==', doc(firestore, `Locations/${connect.place_id}`)),
            where('batchID', '==', app_data.currentBatch),
            where('status', '==', 'secondary')
        )
        getDocs(alertQuery)
            .then(snapshot => {
                const docs = snapshot.docs
                setAlertLocation(docs.map(doc => doc.data()))
            })
            .catch(error => {
                setAlertLocation([])
            })
    }

    const handleRefreshAlerts = async () => {
        

        if (app_data) {
            if (app_data.isUpdating) return;
        }
        console.log('running...')

        server().post('/api/refreshAlerts', {
            currentBatch: app_data ? app_data.currentBatch : null,
            lastBatch: app_data ? app_data.lastBatch : null
        })
            .then(response => {
                const { data } = response
                if (data.error) {
                    console.log('Something went wrong: ', data.error)
                }
                console.log('All Done')
            })
            .catch(error => {
                console.log('Something went wrong: ', error.message)
            })
    }

    const handleSetAlerts = async () => {
        var docs = []
        for (var index = 0; index < alertLocation.length; index++) {
            const snapshot = await getDoc(alertLocation[index].alert)
                .catch(error => console.log(error))
            docs.push(snapshot.data())
        }

        setAlerts(docs)
    }


    React.useEffect(() => {
        handleSetAppData()
        listenForUpdates()
    }, [])


    React.useEffect(() => {
        if (app_data) handleSetRefresh()
    }, [app_data])


    React.useEffect(() => {
        if (app_data && connect) handleSetAlertLocation()
    }, [app_data, connect])


    React.useEffect(() => {
        if (alertLocation) handleSetAlerts()
    }, [alertLocation])


    React.useEffect(() => {
        console.log(refresh)
        if (refresh && app_data) handleRefreshAlerts()
    }, [refresh])

    return { alerts }

}


export default useAlerts