const locations = require('./locations.json')

module.exports = {
    getLocations: (currentCoordinates) => {
        const coordinates = locations.map(({ location }, index) => {
            return { location, index }
        })
        const calcLocations = require('./__calc.location')
        const indexOfLocations = calcLocations(currentCoordinates, coordinates)

        return indexOfLocations.map(index => locations[index])
    }
} 