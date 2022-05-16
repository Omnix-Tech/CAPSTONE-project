const { DatabaseManager } = require('.')
const { PostCollection } = require('./Posts')
const { UserCollection } = require('./Users')


const LIKES_COLLECTION = 'Likes'


class Likes extends DatabaseManager {
    constructor() {
        super(LIKES_COLLECTION)
    }

    async create({ uid, postId }) {
        return await super.create({
            data: {
                post: PostCollection.getReference(postId),
                user: UserCollection.getReference(uid)
            }
        })
    }
}

const LikesCollection = new Likes()

module.exports = { LikesCollection }

