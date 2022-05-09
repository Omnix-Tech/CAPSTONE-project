import React from 'react'
import useRequestHandlers from '../handlers'
import useFeedback from './useFeedback'


import { collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from 'firebase/firestore'
import { firestore } from '../../app/config/firebase.config'



const useAlerts = ({ connect, parish, category }) => {
    const { showSuccess, showError, render } = useFeedback()
    const { Post } = useRequestHandlers()

    const [alerts, setAlerts] = React.useState(null)
    const [refresh, setRefresh] = React.useState(false)
    const [app_data, setAppData] = React.useState(null)


    const [connectReference, setConnectReference] = React.useState(null)
    const [currentQuery, setCurrentQuery] = React.useState(null)


    const [querries, setQuerries] = React.useState({
        parish: null,
        connect: null,
        type: null,
        wanted: null,
        missing: null
    })





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
            setRefresh(difference <= 0)
        }
    }

    const handleRefreshAlerts = async () => {


        if (app_data) {
            if (app_data.isUpdating) return;
        }
        console.log('running...', app_data)

        Post('api/alerts', {
            currentBatch: app_data ? app_data.currentBatch : null,
            lastBatch: app_data ? app_data.lastBatch : null
        })
            .then(res => {
                const { presentBatch } = res
                showSuccess({message: 'Alerts Updated' })
                console.log(presentBatch)
            })
            .catch(error => showError({ message: `Something went wrong: ${error.message}` }))

        // server().post('/api/refreshAlerts', {
        //     currentBatch: app_data ? app_data.currentBatch : null,
        //     lastBatch: app_data ? app_data.lastBatch : null
        // })
        //     .then(response => {
        //         const { data } = response
        //         if (data.error) {
        //             console.log('Something went wrong: ', data.error)
        //         }
        //     })
        //     .catch(error => {
        //         console.log('Something went wrong: ', error.message)
        //     })
    }


    const handleSetCurrentQuerry = () => {
        if (category) {
            if (category === 'wanted') {
                if (querries.wanted) setCurrentQuery(querries.wanted)
            } else if (category === 'missing') {
                if (querries.missing) setCurrentQuery(querries.missing)
            }
        } else if (parish) {
            if (querries.parish) setCurrentQuery(querries.parish)
        } else {
            if (querries.connect) setCurrentQuery(querries.connect)
        }
    }


    const handleSetQuerries = () => {
        if (category) {
            if (category === 'wanted') {
                setQuerries({
                    ...querries,
                    wanted: query(collection(firestore, 'Alerts'), where('batchID', '==', app_data.currentBatch), where('category', '==', 'wanted'))
                })
            } else if (category === 'missing') {
                setQuerries({
                    ...querries,
                    missing: query(collection(firestore, 'Alerts'), where('batchID', '==', app_data.currentBatch), where('category', '==', 'missing'))
                })
            }
        } else if (parish) {
            setQuerries({
                ...querries.connect,
                parish: parish.toUpperCase().includes('KINGSTON') ?
                    query(collection(firestore, 'Alerts'), where('batchID', '==', app_data.currentBatch), where('parishes', 'array-contains-any', ['ST. ANDREW', 'KINGSTON']), orderBy('date', 'desc'))
                    : query(collection(firestore, 'Alerts'), where('batchID', '==', app_data.currentBatch), where('parishes', 'array-contains', parish.toUpperCase()), orderBy('date', 'desc'))
            })
        } else {
            setQuerries({
                ...querries,
                connect: query(collection(firestore, 'Alerts'), where('batchID', '==', app_data.currentBatch), where('connects', 'array-contains', connectReference), orderBy('date', 'desc'))
            })
        }
    }


    const handleSetAlerts = async () => {
        getDocs(currentQuery)
            .then(querySnapshot => {
                setAlerts(querySnapshot.docs.map(snapshot => ({ id: snapshot.id, ...snapshot.data() })))
            })
            .catch(error => {
                console.log(error)
                showError({ message: 'Something went wrong' })
            })
    }




    React.useEffect(() => {
        handleSetAppData()
        listenForUpdates()
    }, [])


    React.useEffect(() => {
        if (connect) setConnectReference(doc(firestore, `Locations/${connect.place_id}`))
    }, [connect])



    React.useEffect(() => {
        if (app_data) {
            handleSetRefresh()
        }
    }, [app_data])


    React.useEffect(() => {
        if (refresh && app_data) handleRefreshAlerts()
    }, [refresh])


    React.useEffect(() => {
        handleSetCurrentQuerry()
    }, [querries])

    React.useEffect(() => {
        if (app_data) handleSetQuerries()
    }, [connectReference, parish, category, app_data])


    React.useEffect(() => {
        if (currentQuery) handleSetAlerts()
    }, [currentQuery])



    return { alerts, render }

}


export default useAlerts