const { admin } = require('../config/admin.config')
const { Database, firestore } = require('.')
const { UserCollection } = require('./User')
const { PostLocationCollection } = require('./Location')

const { v4: uuidv4 } = require('uuid');
const POST_COLLECTION = 'Posts'
const FILE_COLLECTION = 'Files'
const LIKES_COLLECTION = 'Likes'

class Posts {
    constructor() {
        this.db = new Database(POST_COLLECTION)
        this.FileCollection = new Files()
    }

    async create({ uid, content, files, location, privacy, forum }) {
        const post = {
            user: UserCollection.getReference(uid),
            content,
            timeStamp: admin.firestore.Timestamp.now(),
            valid: true,
            forum,
            privacy
        }

        const response = await firestore.runTransaction(async (transaction) => {
            const response = await this.db.create({
                data: post,
                id: uuidv4()
            }, transaction).catch(error => { throw error })

            await PostLocationCollection.create(
                {
                    post: response.ref,
                    location_id: location,
                    isPublic: forum ? false : true
                }, response.res
            ).catch(error => { throw error })


            for (var fileIndex = 0; fileIndex < files.length; fileIndex++) {
                await this.FileCollection.create({
                    file: files[fileIndex],
                    post: response.ref
                }, response.res).catch(error => { throw error })
            }

            return response

        }).catch(error => { throw error })



        return response
    }

    getReference(id) {
        return this.db.getReference(id)
    }
}


class Files {
    constructor() {
        this.db = new Database(FILE_COLLECTION)
    }

    async create({ file, post }, transaction = null) {
        const response = await this.db.create({
            data: {
                file,
                post
            }, id: uuidv4()
        }, transaction).catch(error => { throw error })

        return response
    }
}



class Likes {
    constructor() {
        this.db = new Database(LIKES_COLLECTION)
        this.PostCollection = new Posts()
    }

    async create({ uid, postId }) {
        const response = await this.db.create({
            data: {
                post: this.PostCollection.getReference(postId),
                user: UserCollection.getReference(uid)
            }
        }).catch(error => { throw error })


        return response
    }


    async remove(id) {
        return await this.db.remove(id)
    }
}


module.exports = {
    PostCollection: new Posts(),
    FileCollection: new Files(),
    LikesCollection: new Likes()
}