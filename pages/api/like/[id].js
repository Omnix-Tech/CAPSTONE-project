import { LikesCollection } from "../../../app/models/Likes";


export default async function handler(req, res) {

    console.log(req)

    const { method } = req
    const { id } = req.query

    console.log(method, id)

    switch (method) {

        case 'DELETE':

            try {

                await LikesCollection.remove(id)
                res.status(200).json({ message: 'OK' })

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