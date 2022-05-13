
const { admin } = require('../config/admin.config')
const { Database } = require('.')
const USER_COLLECTION = 'Users'


class Users {

    constructor() {
        this.db = new Database(USER_COLLECTION)
    }

    async update({ id, data }) {
        const response = await this.db.update({ data, id }).catch(err => { throw err })
        return response
    }

    async create({ uid, firstName, lastName, email }) {

        const user = {
            firstName, lastName, email, verified: false, isVerifying: false, verificationStatus: '', verifiedIdentity: false, isRegistered: false, timeStamp: admin.firestore.Timestamp.now()
        }
        
        const response = await this.db.create({
            data: user,
            id: uid
        }).catch( error => { throw error })


        return response
    }
    
    async get(id) {
        const snapshot = await this.getReference(id).get().catch(err => { throw err })
        return snapshot.data()
    }

    getReference(id) {
        return this.db.getReference(id)
    }


}


const UserCollection = new Users()

module.exports = { UserCollection }