import { LikesCollection } from "../../app/models/Likes"



export default async function handler(req, res) {


    const { postId, uid } = req.body
    try {
        await LikesCollection.create({ uid, postId })
            .catch(error => { throw error })
        res.status(200).json()

    } catch (error) {
        res.status(200).json({ error: error.message })
    }


}
