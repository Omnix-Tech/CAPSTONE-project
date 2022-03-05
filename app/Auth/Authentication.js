import { app } from "../utils/firebase.config";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, getAuth } from "firebase/auth"

const auth = getAuth(app)

const register = async (firstName, lastName, email, password) => {
    const credentials = await createUserWithEmailAndPassword(auth, email, password, firstName, lastName)
        .catch(err => { throw err })


        return credentials
}

const signIn = async (email, password) => {
    const user = await signInWithEmailAndPassword(auth, email, password)
        .catch(err => { throw err })


    console.log(user)
    return user
}


const logout = () => {
    signOut(auth)
}


export { register, signIn, logout, auth }