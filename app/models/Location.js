const { Database } = require('.')
const { UserCollection } = require('./User')

const { v4: uuidv4 } = require('uuid');
const { admin } = require('../config/admin.config');



const LOCATION_COLLECTION = 'Locations'
const USER_LOCATION_COLLECTION = 'User_Location'
const POST_LOCATION_COLLECTION = 'Post_Location'
const FORUM_LOCATION_COLLECTION = 'Forum_Location'
const ALERT_LOCATION_COLLECTION = 'AlertLocation'


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

    async remove({ uid, location_id }) {
        await this.db.remove(`${uid}-${location_id}`)
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



class ForumLocation {
    constructor() {
        this.db = new Database(FORUM_LOCATION_COLLECTION)
        this.locations = new Location()
    }

    async create({ forum, location_id }, transaction = null) {
        const response = await this.db.create({
            data: {
                forum,
                location: this.locations.getReference(location_id)
            },
            id: uuidv4()
        }, transaction).catch(error => { throw error })


        return response
    }
}


class AlertLocation {
    constructor() {
        this.db = new Database(ALERT_LOCATION_COLLECTION)
        this.locations = new Location()
    }

    async create({ alert, location_id, status, batchID }, transaction = null) {
        console.log('Batch ID#: ', batchID) 
        const response = await this.db.create({
            data: {
                alert,
                location: this.locations.getReference(location_id),
                status,
                batchID
            }
        }, transaction).catch(error => {
            console.log('ERROR Batch ID#: ', batchID) 
            throw error 
        })


        return response
    }

    async deleteBatch({ batchID }) {
        const query = this.db.collection.where('batchID', '==', batchID)
        query.get().then(async querySnapshot => {
            const docs = querySnapshot.docs

            for (var index = 0; index < docs.length; index++) {
                await this.remove(docs[index].id)
            }

        }).catch(error => {
            
            throw error
        })
    }


    async remove(id) {
        return await this.db.remove(id)
    }
}


module.exports = {
    LocationCollection: new Location(),
    UserLocationCollection: new UserLocation(),
    PostLocationCollection: new PostLocation(),
    ForumLocationCollection: new ForumLocation(),
    AlertLocationCollection: new AlertLocation()
}