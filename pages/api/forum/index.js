import { ForumCollection } from '../../../server/models/Forums'

export default async function handler(req, res) {


    const { method } = req

    switch (method) {
        case 'POST':

            try {
                const { uid, title, description, connects } = JSON.parse(req.body)

                await ForumCollection.create({
                    data: { uid, title, description, connects }
                })
                res.status(200).json({ message: 'OK' })

            } catch (error) {

                console.log(error)
                res.status(200).json({ error: error.message })

            }

            break;

        default:
            // Invalid Method
            console.log(new Error('Invalid Method: ', method))
            res.status(405)
    }
}