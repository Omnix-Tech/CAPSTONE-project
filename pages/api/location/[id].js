import { UserLocationCollection } from "../../../app/models/Location";
import { UserCollection } from "../../../app/models/User";
export const config = {
    api: {
        bodyParser: false
    }
}

export default async function handler(req, res) {


    const { method } = req
    const { id } = req.query

    switch (method) {

        case 'POST':

            try {

                const { uid } = JSON.parse(req.body)
                
                await UserLocationCollection.create({ uid, location_id: id })
                await UserCollection.update({ id: uid, data: { isRegistered: true }})
                res.status(200).json({ message: 'OK' })

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