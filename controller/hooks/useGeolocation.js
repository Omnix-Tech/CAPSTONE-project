import React from 'react'
import useRequestHandlers from '../handlers'


function getDistance(xlng, xlat, ylng, ylat) {
    const toRadians = (degree) => degree * Math.PI / 180
    const [lng1, lng2, lat1, lat2] = [toRadians(xlng), toRadians(ylng), toRadians(xlat), toRadians(ylat)];

    const diffLng = lng2 - lng1
    const diffLat = lat2 - lat2

    var val = Math.pow(Math.sin(diffLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diffLng / 2), 2)


    return (2 * Math.asin(Math.sqrt(val))) * 6371
}

const useGeolocation = () => {
    const [watch_id, setWatchId] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [position, setPosition] = React.useState(null)
    const [locations, setLocations] = React.useState([])
    const { Get } = useRequestHandlers()


    const watchPosition = currentPosition => {
        const { latitude: currentLatitude, longitude: currentlongitude } = currentPosition.coords
        const { latitude, longitude } = position

        var distance = getDistance(currentlongitude, currentLatitude, longitude, latitude)
        if (distance >= 1.5) setPosition(position.coords)

    }

    const handleSetLocations = async () => {
        if (position) {
            Get(`api/location/${position.latitude}/${position.longitude}`)
                .then(res => {
                    const { locations } = res
                    setLocations(locations)
                })
                .catch(error => setError({ status: 0, message: error?.message }))
        }
    }

    const onSuccess = position => {
        setPosition(position.coords)
    }

    const onError = error => {
        console.log(error)
        setError({ status: 0, message: 'Failed to get location' })
    }


    React.useEffect(() => {
        if (!('geolocation' in navigator)) {
            setError({
                status: 0,
                message: 'Geoloaction not supported'
            })
        } else {
            navigator.geolocation.getCurrentPosition(onSuccess, onError)
        }
    }, [])

    React.useEffect(() => {
        if (position) handleSetLocations()
    }, [position])


    React.useEffect(() => {

        if (position && !(watch_id)) {
            const id = navigator.geolocation.watchPosition(watchPosition, error => console.log(error), { timeout: 60000 })
            setWatchId(id)
        }

    }, [position])



    return {
        position, locations, error
    }
}

export default useGeolocation