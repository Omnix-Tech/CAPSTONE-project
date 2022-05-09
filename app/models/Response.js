const { Database } = require('.')
const { admin } = require('../config/admin.config')

const { PostCollection } = require('./Post')
const { UserCollection } = require('./User')


const RESPONSE_COLLECTION = 'Responses'


class Response {
    constructor() {
        this.db = new Database(RESPONSE_COLLECTION)
    }

    async create({ uid, post, content }) {
        const response = await this.db.create({
            data: {
                post: PostCollection.getReference(post),
                user: UserCollection.getReference(uid),
                content: content,
                timeStamp: admin.firestore.Timestamp.now()
            }
        })
            .catch(error => { throw error })

        return response
    }


    async remove(id) {
        return await this.db.remove(id)
    }


}


module.exports = {
    ResponseCollection: new Response()
}