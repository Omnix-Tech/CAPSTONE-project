import { auth } from '../Firebase/firebase.config'



const signIn = async (email, password) => {
    const user = await auth.signInWithEmailAndPassword(email, password)
        .catch(err => { throw err })
    return user
}

const logout = async () => {
    await auth.signOut()
}


export { signIn, logout, auth }