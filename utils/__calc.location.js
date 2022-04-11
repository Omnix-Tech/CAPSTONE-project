

const distance = (xlat, ylat, xlng, ylng) => {
    const toRadians = (degree) => degree * Math.PI / 180
    const [lng1, lng2, lat1, lat2] = [ toRadians(xlng), toRadians(ylng), toRadians(xlat), toRadians(ylat) ];

    const diffLng = lng2 - lng1
    const diffLat = lat2 - lat2

    var val = Math.pow(Math.sin(diffLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(diffLng / 2), 2)
    
    return (2 * Math.asin(Math.sqrt(val))) * 6371
}


module.exports = (currentCoordinates, coordinates) => {
    var coordinates_with_distance = coordinates.map( (coord) => {
        return {
            distance: distance(currentCoordinates.lat, coord.location.lat, currentCoordinates.lng, coord.location.lng),
            index: coord.index
        }
    })

    coordinates_with_distance.sort((firstElement, secondElement) => {
        return firstElement.distance - secondElement.distance
    })
    
    return coordinates_with_distance.slice(0,6).map(({index}) => index)
}