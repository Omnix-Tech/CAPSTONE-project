var admin = require('firebase-admin')
const serviceAccount = require('./config.json')

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

module.exports = {
    admin,
    app
}