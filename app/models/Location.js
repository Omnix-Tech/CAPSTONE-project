const { Database } = require('.')
const { UserCollection } = require('./User')

const { v4: uuidv4 } = require('uuid');
const { admin } = require('../config/admin.config');



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


class UserLocation {
    constructor() {
        this.db = new Database(USER_LOCATION_COLLECTION)
        this.locations = new Location()
    }

    async create({ uid, location_id }) {
        const response = await this.db.create({
            data: {
                user: UserCollection.getReference(uid),
                location: this.locations.getReference(location_id)
            },
            id: `${uid}-${location_id}`
        }).catch(error => { throw error })

        return response
    }
}



class PostLocation {
    constructor() {
        this.db = new Database(POST_LOCATION_COLLECTION)
        this.locations = new Location()
    }

    async create({ post, location_id, isPublic }, transaction = null) {


        const response = await this.db.create({
            data: {
                post,
                isPublic,
                timeStamp: admin.firestore.Timestamp.now(),
                location: this.locations.getReference(location_id)
            },
            id: uuidv4()
        }, transaction).catch(error => { throw error })


        return response
    }
}


module.exports = {
    LocationCollection: new Location(),
    UserLocationCollection: new UserLocation(),
    PostLocationCollection: new PostLocation()
}