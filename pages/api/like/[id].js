import { LikesCollection } from "../../../app/models/Likes";


export default async function handler(req, res) {


    const { method } = req
    const { id } = req.query

    switch (method) {

        case 'DELETE':

            try {

                await LikesCollection.remove(id)
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