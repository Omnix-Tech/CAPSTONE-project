const { Database } = require('.')
const { UserCollection } = require('./User')


const LOCATION_COLLECTION = 'Locations'
const USER_LOCATION_COLL = 'User_Location'


class Location {
    constructor() {
        this.db = new Database(LOCATION_COLLECTION)
    }

    async update(data, { id, ref }) {
        return { ... await this.db.update({ data, id, ref }).catch(error => { throw error }) }
    }


    getReference(id) {
        return this.db.getReference(id)
    }


}


class UserLocation {
    constructor() {
        this.db = new Database(USER_LOCATION_COLL)
        this.locationDB = new Location()
    }

    async create({ uid, location_id }) {
        const response = await this.db.create({
            data: {
                user: UserCollection.getReference(uid),
                location: this.locationDB.getReference(location_id)
            },
            id: `${uid}-${location_id}`
        }).catch( error => { throw error })

        return response
    }
}


module.exports = {
    LocationCollection: new Location(),
    UserLocationCollection: new UserLocation()
}