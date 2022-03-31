
const { PostCollection } = require('../../models/Post')

export default async function handler(req, res) {
    const { latitude, longitude } = req.body


    PostCollection.create({ uid, content, files, locations })


    try {
        res.status(200).json()
    } catch (error) {
        res.status(200).json({ error: error.message })
    }


}