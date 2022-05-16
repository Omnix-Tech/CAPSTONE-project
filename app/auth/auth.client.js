const {
    signInWithCustomToken,
    signInWithEmailAndPassword
} = require('firebase/auth')

const { auth } = require('../config/firebase.config')

const signInWithToken = async (token) => {
    const credentials = await signInWithCustomToken(auth, token).catch(error => {
        if (error.message.includes('auth/invalid-custom-token')) auth.signOut()
        throw error
    })
    return credentials
}


const signIn = async ({ email, password }) => {
    const credentials = await signInWithEmailAndPassword(auth, email, password).catch(error => { throw error })
    return credentials
}



module.exports = {
    signInWithCustomToken: signInWithToken,
    signInWithEmailAndPassword: signIn
}