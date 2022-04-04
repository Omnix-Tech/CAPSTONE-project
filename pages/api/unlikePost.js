import { LikesCollection } from "../../models/Post"



export default async function handler(req, res) {


    const { likeId } = req.body
    try {
        await LikesCollection.remove(likeId)
            .catch(error => { throw error })
        res.status(200).json()

    } catch (error) {
        console.log(error)
        res.status(200).json({ error: error.message })
    }


}
