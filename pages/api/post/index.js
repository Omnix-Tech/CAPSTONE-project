import { PostCollection } from "../../../app/models/Posts"

export default async function handler(req, res) {


    const { method } = req

    switch (method) {
        case 'POST':

            try {
                const { uid, content, privacy, files, forum, location } = JSON.parse(req.body)

                await PostCollection.create({ uid, content, files, location, privacy, forum })
                res.status(200).json({ message: 'OK' })


            } catch (error) {
                console.log(error)
                res.status(200).json({ error: error.message })
            }


            break;
        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(405)
    }
}