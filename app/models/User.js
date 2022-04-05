
const { admin } = require('../config/admin.config')
const { Database } = require('.')
const USER_COLLECTION = 'Users'


class Users {

    constructor() {
        this.db = new Database(USER_COLLECTION)
    }

    async create({ uid, firstName, lastName, email }) {

        const user = {
            firstName, lastName, email, verified: false, timeStamp: admin.firestore.Timestamp.now()
        }
        
        const response = await this.db.create({
            data: user,
            id: uid
        }).catch( error => { throw error })


        return response
    }

    getReference(id) {
        return this.db.getReference(id)
    }


}


module.exports = {
    UserCollection: new Users()
}