
const { PostCollection } = require('../../app/models/Post')


export default async function handler(req, res) {
    
   
    const { content, privacy, files, user, forum, location } = req.body
    try {
        const response = await PostCollection.create({ uid: user, content, files, privacy, location, forum })
            .catch(error => { throw error })
        res.status(200).json()

    } catch (error) {
        res.status(200).json({ error: error.message })
    }


}