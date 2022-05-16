
import { ForumCollection } from "../../../../app/models/Forums"


export default async function handler(req, res) {


    const { method } = req
    const { id } = req.query

    switch (method) {

        case 'POST':

            try {

                const { uid } = JSON.parse(req.body)
                await ForumCollection.addMember({ id, uid })
                res.status(200).json({ message: 'OK' })

            } catch (error) {

                console.log(error)
                res.status(200).json({ error: error.message })
                
            }
            break;


        case 'DELETE':

            try {

                await ForumCollection.removeMember({ id, uid })
                res.status(200).json()

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