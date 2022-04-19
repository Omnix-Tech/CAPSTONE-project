
const { Database, firestore } = require(".")
const { ForumLocationCollection } = require('./Location')
const { UserCollection } = require('./User')


const FORUM_COLLECTION = 'Forums'

class Forum {
    constructor() {
        this.db = new Database(FORUM_COLLECTION)

    }


    async create({ user_id, forum_title, description, connects }) {
        
        const forum = {
            user: UserCollection.getReference(user_id),
            title: forum_title,
            description
        }
    
        const response = await firestore.runTransaction( async transaction => {
            const response = await this.db.create({ data: forum }, transaction )

            for (var connectIndex = 0; connectIndex < connects.length; connectIndex++ ) {
                await ForumLocationCollection.create({
                    forumRef: response.ref,
                    location_id: connects[connectIndex]
                }, response.res )
            }

            return response
        }).catch( error => {
            console.log(error)
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


module.exports = {
    ForumCollection: new Forum()
}