import { ResponseCollection } from "../../../server/models/Responses"


export default async function handler(req, res) {


    const { method } = req

    switch (method) {
        case 'POST':

            const { uid, post, content } = JSON.parse(req.body)

            try {
                await ResponseCollection.create({ uid, post, content })
                res.status(200).json({ message: 'OK' })
            } catch (error) {
                console.log(error)
                res.status(500)
            }

            break;

        default:
            // Invalid Method
            console.log(new Error('Invalid Method: ', method))
            res.status(405)
    }
}