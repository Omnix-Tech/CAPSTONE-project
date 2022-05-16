import { UserCollection } from "../../../server/models/Users"

export default async function handler(req, res) {


    const { method } = req
    const { id } = req.query

    switch (method) {

        case 'POST':

            try {

                const { uid } = JSON.parse(req.body)

                await UserCollection.addLocation({ uid, location: id })
                res.status(200).json({ message: 'OK' })

            } catch (error) {

                console.log(error)
                res.status(500).json({ error: error.message })
            }


            break;

        case 'DELETE':

            try {

                const { uid } = JSON.parse(req.body)

                await UserCollection.removeLocation({ uid, location: id })
                res.status(200).json({ message: 'OK' })

            } catch (error) {
                console.log(error)
                res.status(500).json({ error: error.message })
            }
            break;

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(404)
    }
}