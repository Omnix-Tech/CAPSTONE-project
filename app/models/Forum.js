
const { Database, firestore } = require(".")
const { ForumLocationCollection } = require('./Location')
const { UserCollection } = require('./User')
const { admin } = require('../config/admin.config')


const FORUM_COLLECTION = 'Forums'
const USER_FORUM_COLLECTION = 'User_Forum'

class Forum {
    constructor() {
        this.db = new Database(FORUM_COLLECTION)
        this.UserForumCollection = new UserForum()
    }


    async create({ uid, title, description, connects }) {

        const forum = {
            owner: UserCollection.getReference(uid),
            title: title,
            timeStamp: admin.firestore.Timestamp.now(),
            description
        }

        const response = await firestore.runTransaction(async transaction => {
            const response = await this.db.create({ data: forum }, transaction)
            for (var connectIndex = 0; connectIndex < connects.length; connectIndex++) {
                await ForumLocationCollection.create({
                    forum: response.ref,
                    location_id: connects[connectIndex]
                }, response.res)
            }

            this.UserForumCollection.create({ forum: response.ref, user: uid, status: 'Owner' })

            return response
        }).catch(error => {
            throw error
        })


        return response
    }


    async remove(id) {

    }


    getReference(id) {
        return this.db.getReference(id)
    }
}



class UserForum {
    constructor() {
        this.db = new Database(USER_FORUM_COLLECTION)
    }

    async create({ forum, uid, status }, transaction = null) {
        
        const data = {
            forum, user: UserCollection.getReference(uid), timeStamp: admin.firestore.Timestamp.now(), status
        }
        const response = await this.db.create({ data }, transaction).catch(error => { throw error })
        return response
    }

    async remove(id) {
        this.db.remove(id)
    }
}




module.exports = {
    ForumCollection: new Forum(),
    UserForumCollection: new UserForum()
}