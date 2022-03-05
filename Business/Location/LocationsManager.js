
const { firestore } = require('../Database/FirestoreDB')
const geolocations = require('./__update.locations')
const fs = require('fs')


class LocationsManager {
    constructor() {
        this.db = firestore('Locations')
    }

    async #get_locations() {
        try {
            
            const locations = require('./locations.json')
            // if (!locations) {
            //     locations = await geolocations().catch(error => console.log(error))
            //     fs.writeFileSync('./locations.json', JSON.stringify(locations), error => {
            //         if (error) { throw error }
            //     })
            // }

            for (var locationIndex = 0; locationIndex < locations.length; locationIndex++) {
                await this.db.add(locations[locationIndex], locations[locationIndex].place_id).catch( error => { throw error })
            }

        } catch (error) {
            console.log(error)
        }
    }

    async get_locations() {
        await this.#get_locations()
    }

    async getClosestLocation(coords) {
        const docs = await this.db.select('location').catch( error => console.log(error))
        const locations = docs.map( doc => { return { ref : doc.ref, ... doc.data() } })
        

        const coordinates = locations.map( (location, index) => {
            return { location: location.location, index: index}
        })

        const currentLocation = require('./__currentLocation')
        const indexOfLocation = currentLocation(coords, coordinates)

        const location = await this.db.getRefDoc(locations[indexOfLocation].ref).catch( error => console.log(error))
        return location
    }
}


module.exports = () => new LocationsManager()