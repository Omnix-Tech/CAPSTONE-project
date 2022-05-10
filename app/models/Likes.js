const { Database } = require('.')
const { admin } = require('../config/admin.config')

const { PostCollection } = require('./Post')
const { UserCollection } = require('./User')


const LIKES_COLLECTION = 'Likes'
class Likes {
    constructor() {
        this.db = new Database(LIKES_COLLECTION)
    }

    async create({ uid, postId }) {
        const response = await this.db.create({
            data: {
                post: PostCollection.getReference(postId),
                user: UserCollection.getReference(uid),
                timeStamp: admin.firestore.Timestamp.now()
            }
        }).catch(error => { throw error })


        return response
    }


    async remove(id) {
        return await this.db.remove(id)
    }
}

const LikesCollection = new Likes()


module.exports = { LikesCollection }