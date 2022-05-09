import { PostCollection } from "../../../app/models/Post";


export default async function handler(req, res) {


    const { method } = req

    switch (method) {
        case 'POST':

            try {
                const { uid, content, privacy, files, forum, location } = req.body
                await PostCollection.create({ uid, content, files, privacy, location, forum })
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