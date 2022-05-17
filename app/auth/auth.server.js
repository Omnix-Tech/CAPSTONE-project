const { admin } = require('../config')
const auth = admin.auth()



class Authentication {
    async registerUser({ firstName, lastName, email, password }) {

        const record = await auth.createUser({
            displayName: `${firstName} ${lastName}`,
            email,
            password
        }).catch(error => { throw error })


        return record
    }

    async updateAccount(uid, { email, password }) {
        console.log(uid, email, password)
        return email ? await auth.updateUser(uid, { email }) : await auth.updateUser(uid, { password })
    }


    async deleteAccount(uid) {
        return await auth.deleteUser(uid)
    }

    async getCustomToken(uid) {
        return await auth.createCustomToken(uid).catch(error => { throw error })
    }
}

module.exports = {
    Auth: new Authentication()
}



