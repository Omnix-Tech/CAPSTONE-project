const { DatabaseManager } = require('.')
const { ForumCollection } = require('./Forums')
const { LocationCollection } = require('./Locations')
const { UserCollection } = require('./Users')

const POST_COLLECTION = 'Posts'
const FILES_COLLECTION = 'Files'


class Posts extends DatabaseManager {
    constructor() {
        super(POST_COLLECTION)
    }

    async create({ uid, content, files, location, privacy, forum }) {

        const response = await super.create({
            data: {
                user: UserCollection.getReference(uid),
                content,
                valid: true,
                forum: forum ? ForumCollection.getReference(forum) : null,
                privacy,
                location: forum ? null : LocationCollection.getReference(location),
                files: files.map(file => file)
            }
        })

        return response
    }
}




const PostCollection = new Posts()


module.exports = { PostCollection }