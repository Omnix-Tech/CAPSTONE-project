const { DatabaseManager } = require('.')

const LOCATION_COLLECTION = 'Locations'

class Locations extends DatabaseManager {
    constructor() {
        super(LOCATION_COLLECTION)
    }
}


const LocationCollection = new Locations()

module.exports = { LocationCollection }