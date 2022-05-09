const { admin } = require('../config/admin.config')
const { Database, firestore } = require('.')
const { UserCollection } = require('./User')
const { PostLocationCollection } = require('./Location')

const { v4: uuidv4 } = require('uuid');
const { ResponseCollection } = require('./Response');
const { ForumCollection } = require('./Forum');
const POST_COLLECTION = 'Posts'
const FILE_COLLECTION = 'Files'
const FORUM_POST_COLLECTION = 'Forum_Post'


class Posts {
    constructor() {
        this.db = new Database(POST_COLLECTION)
        this.FileCollection = new Files()
        this.ForumPostCollection = new ForumPost()
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


            if (forum) await this.ForumPostCollection.create({ forum, post: response.ref }, transaction).catch(error => { throw error })

            if (!forum) await PostLocationCollection.create(
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

    async remove(id) {
        const query = ResponseCollection.db.collection.where('post', '==', this.getReference(id))
        query.get()
            .then(async querySnapshot => {
                const docs = querySnapshot.docs

                for (var docIndex = 0; docIndex < docs.length; docIndex++) {
                    await ResponseCollection.remove(docs[docIndex].id)
                }

                await this.db.remove(id)
            })
            .catch(error => { throw error })


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


class ForumPost {
    constructor() {
        this.db = new Database(FORUM_POST_COLLECTION)
    }


    async create({ forum, post }, transaction = null) {
        const data = {
            forum: ForumCollection.getReference(forum),
            post: post,
            timeStamp: admin.firestore.Timestamp.now()
        }


        const response = await this.db.create({ data }, transaction)
            .catch(error => { throw error })


        return response

    }


    async remove(id) {
        await this.db.remove(id)
    }
}





module.exports = {
    PostCollection: new Posts(),
    FileCollection: new Files(),
    ForumPostCollection: new ForumPost()
}