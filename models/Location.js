const { Database } = require('.')
const { UserCollection } = require('./User')

const { v4: uuidv4 } = require('uuid');



const LOCATION_COLLECTION = 'Locations'
const USER_LOCATION_COLLECTION = 'User_Location'
const POST_LOCATION_COLLECTION = 'Post_Location'


class Location {
    constructor() {
        this.db = new Database(LOCATION_COLLECTION)
    }

    async update(data, { id, ref }) {
        return { ... await this.locations.update({ data, id, ref }).catch(error => { throw error }) }
    }


    getReference(id) {
        return this.db.getReference(id)
    }


}


class UserLocation extends Location {
    constructor() {
        this.db = new Database(USER_LOCATION_COLLECTION)
    }

    async create({ uid, location_id }) {
        const response = await this.db.create({
            data: {
                user: UserCollection.getReference(uid),
                location: this.getReference(location_id)
            },
            id: `${uid}-${location_id}`
        }).catch(error => { throw error })

        return response
    }
}



class PostLocation extends Location {
    constructor() {
        this.db = new Database(POST_LOCATION_COLLECTION)
    }

    async create({ post, location_id }, transaction = null) {
        const response = await this.db.create({
            data: {
                post,
                location: this.getReference(location_id)
            }, id: uuidv4()
        }, transaction).catch(error => { throw error })

        return response
    }
}


module.exports = {
    LocationCollection: new Location(),
    UserLocationCollection: new UserLocation(),
    PostLocationCollection: new PostLocation()
}