
const { ResponseCollection } = require('../../app/models/Response')


export default async function handler(req, res) {


    const { user, post, content } = req.body
    try {
        await ResponseCollection.create({ uid: user, postId: post, content })
            .catch(error => { throw error })
        res.status(200).json()

    } catch (error) {
        console.log(error.message)
        res.status(200).json({ error: error.message })
    }


}