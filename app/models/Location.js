const { Database } = require('.')
const { UserCollection } = require('./User')

const { v4: uuidv4 } = require('uuid');
const { admin } = require('../config/admin.config');



const LOCATION_COLLECTION = 'Locations'
const USER_LOCATION_COLLECTION = 'User_Location'
const POST_LOCATION_COLLECTION = 'Post_Location'
const FORUM_LOCATION_COLLECTION = 'Forum_Location'


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
        this.db = new Database(USER_LOCATION_COLLECTION)
    }

    async create({ uid, location_id }) {
        const response = await this.db.create({
            data: {
                user: UserCollection.getReference(uid),
                location: LocationCollection.getReference(location_id)
            },
            id: `${uid}-${location_id}`
        }).catch(error => { throw error })

        return response
    }

    async remove({ uid, location_id }) {
        await this.db.remove(`${uid}-${location_id}`)
    }
}



class PostLocation {
    constructor() {
        this.db = new Database(POST_LOCATION_COLLECTION)
    }

    async create({ post, location_id, isPublic }, transaction = null) {


        const response = await this.db.create({
            data: {
                post,
                isPublic,
                timeStamp: admin.firestore.Timestamp.now(),
                location: LocationCollection.getReference(location_id)
            },
            id: uuidv4()
        }, transaction).catch(error => { throw error })


        return response
    }

    async remove(id) {
        return await this.db.remove(id)
    }
}



class ForumLocation {
    constructor() {
        this.db = new Database(FORUM_LOCATION_COLLECTION)
    }

    async create({ forum, location_id }, transaction = null) {
        const response = await this.db.create({
            data: {
                forum,
                location: LocationCollection.getReference(location_id)
            },
            id: uuidv4()
        }, transaction).catch(error => { throw error })


        return response
    }

    async remove(id) {
        return await this.db.remove(id)
    }
}



const LocationCollection = new Location()
const UserLocationCollection = new UserLocation()
const PostLocationCollection = new PostLocation()
const ForumLocationCollection = new ForumLocation()

module.exports = { LocationCollection, UserLocationCollection, PostLocationCollection, ForumLocationCollection }