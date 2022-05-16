const { DatabaseManager } = require('.')
const { PostCollection } = require('./Posts')
const { UserCollection } = require('./Users')


const RESPONSE_COLLECTION = 'Responses'


class Responses extends DatabaseManager {
    constructor() {
        super(RESPONSE_COLLECTION)
    }


    async create({ uid, post, content }) {

        return await super.create({
            data: {
                post: PostCollection.getReference(post),
                user: UserCollection.getReference(uid),
                content
            }
        })
    }
}


const ResponseCollection = new Responses()


module.exports = { ResponseCollection }