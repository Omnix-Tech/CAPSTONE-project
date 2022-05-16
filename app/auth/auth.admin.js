const { admin } = require('../config/admin.config')

const auth = admin.auth()


const registerUser = async ({ firstName, lastName, email, password }) => {
    const record = await auth.createUser({
        displayName: `${firstName} ${lastName}`,
        email,
        password
    })
    .catch(err => { throw err })

    return record
}


const getCustomToken = async (uid) => {
    return await auth.createCustomToken(uid).catch(err => { throw err })
}



module.exports = { registerUser, getCustomToken }