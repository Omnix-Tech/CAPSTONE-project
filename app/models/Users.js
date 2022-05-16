const { DatabaseManager } = require('.')
const { admin } = require('../config/admin.config')
const { LocationCollection } = require('./Locations')
const USER_COLLECTION = 'Users'


class Users extends DatabaseManager {
    constructor() {
        super(USER_COLLECTION)
    }

    async create({ uid, firstName, lastName, email, location }) {
        return await super.create({
            id: uid,
            data: {
                firstName,
                lastName,
                email,
                verified: false,
                isVerifying: false,
                verifiedIdentity: false,
                isRegistered: true,
                locations: []
            }
        })
    }


    async addLocation({ uid, location }) {
        return await super.update({
            id: uid,
            data: {
                isRegistered: true,
                locations: admin.firestore.FieldValue.arrayUnion(LocationCollection.getReference(location))
            }
        })
    }

    async removeLocation({ uid, location }) {
        return await super.update({
            id: uid,
            data: {
                locations: admin.firestore.FieldValue.arrayRemove(LocationCollection.getReference(location))
            }
        })
    }
}


const UserCollection = new Users()

module.exports = { UserCollection }