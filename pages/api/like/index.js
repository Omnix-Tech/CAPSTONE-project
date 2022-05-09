import { LikesCollection } from "../../../app/models/Likes";


export default async function handler(req, res) {


    const { method } = req
    switch (method) {
        case 'POST':

            try {

                const { uid, postId } = req.body
                

                await LikesCollection.create({ uid, postId })
                res.status(200).json()

            } catch (error) {

                console.log(error)
                res.status(200).json({ error: error.message })
            }

            break;

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(404)
    }
}