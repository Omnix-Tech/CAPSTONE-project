const { DatabaseManager } = require('.')
const { admin } = require('../config/admin.config')
const { LocationCollection } = require('./Locations')
const { UserCollection } = require('./Users')

const FORUM_COLLECTION = 'Forums'


class Forums extends DatabaseManager {
    constructor() {
        super(FORUM_COLLECTION)
    }


    async create({ data: { uid, title, description, connects }, id }) {

        const owner = UserCollection.getReference(uid)
        const locations = connects.map(connect => LocationCollection.getReference(connect))
        const members = []


        return await super.create({
            data: { owner, connects: locations, description, title, members }
        })
    }


    async addMember({ id, uid }) {
        return super.update({
            id,
            data: {
                members: admin.firestore.FieldValue.arrayUnion(UserCollection.getReference(uid)),
                members_data: admin.firestore.FieldValue.arrayUnion({
                    user: UserCollection.getReference(uid),
                    timeStamp: admin.firestore.Timestamp.now()
                })
            }
        })
    }

    async removeMember({ id, uid, timeStamp }) {
        return super.update({
            id,
            data: {
                members: admin.firestore.FieldValue.arrayRemove(UserCollection.getReference(uid)),
                members_data: admin.firestore.FieldValue.arrayRemove({
                    user: UserCollection.getReference(uid),
                    timeStamp: timeStamp
                })
            }
        })
    }
}

const ForumCollection = new Forums()

module.exports = { ForumCollection }