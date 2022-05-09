import { UserLocationCollection } from "../../../app/models/Location";


export default async function handler(req, res) {


    const { method } = req
    const { id } = req.query

    switch (method) {

        case 'POST':

            try {

                const { uid, community } = req.body
                await UserLocationCollection.create({ uid, location_id: id })

                res.status(200).json()

            } catch (error) {

                console.log(error)
                res.status(500).json({ error: error.message })
            }


            break;

        case 'DELETE':

            try {
                const { uid } = req.body
                await UserLocationCollection.remove({ uid, location_id: id })
                res.status(200).json()
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