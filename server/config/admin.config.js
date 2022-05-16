const admin = require('firebase-admin')
const { config } = require('.')
const serviceAccount = config.FIREBASE_CONFIG


if (admin.apps.length === 0) admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})


module.exports = { admin }