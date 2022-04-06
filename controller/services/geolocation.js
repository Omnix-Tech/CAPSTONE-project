const { getLocations } = require("../handlers")

var locations

const handleUpdateLocations = (pos) => {
    getLocations(pos)
    .then( data => {
       
       
        const locationIds = data.map( location => location.place_id )
        console.log('New Loctions: ', locationIds)
        console.log('Current Locations: ', locations)


    })
    .catch( error => console.log(error) )
}

module.exports = {
    getCurrentPosition(setPosition) {
        navigator.geolocation.getCurrentPosition(
            position => setPosition(position),
            error => alert(error.message)
        )
    },

    listenLocationUpdate(currentLocation) {
        locations = currentLocation.map( location => location.place_id )
        navigator.geolocation.watchPosition(handleUpdateLocations)
    }
}