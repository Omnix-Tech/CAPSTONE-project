const { signInWithCustomToken: tokenSignIn, signInWithEmailAndPassword: signIn } = require('firebase/auth')
const { auth } = require('../config/firebase.config')

const signInWithCustomToken = async (token) => {
    const credentials = await tokenSignIn(auth, token).catch(error => { 
        if (error.message.includes('auth/invalid-custom-token')) auth.signOut()
        throw error
     })
    return credentials
}

const signInWithEmailAndPassword = async({email, password}) => {
    const credentials = await signIn(auth, email, password).catch(error => { throw error })
    return credentials
}

module.exports = {
    signInWithCustomToken,
    signInWithEmailAndPassword
}



