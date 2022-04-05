const firebase = require('firebase/app')
const { getFirestore } = require('firebase/firestore')
const { getStorage } = require('firebase/storage')
const { getAuth } = require('firebase/auth')

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_BUCKET,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID
}


if (!firebase.getApps().length) {
    firebase.initializeApp(firebaseConfig)
}


module.exports = {
    firestore: getFirestore(firebase.getApp()),
    auth: getAuth(firebase.getApp()),
    storage: getStorage(firebase.getApp())
}

