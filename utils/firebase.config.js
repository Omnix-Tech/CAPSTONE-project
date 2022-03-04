var admin = require('firebase-admin')
const serviceAccount = require('./config.json')

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


const auth = admin.auth(app)
const firestore = admin.firestore(app)


module.exports = {
    auth,
    firestore
}