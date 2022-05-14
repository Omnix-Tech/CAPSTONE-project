import { Auth } from "../../../app/auth/auth.server";
import { UserCollection } from "../../../app/models/User";


export default async function handler(req, res) {


    const { method } = req
    switch (method) {
        case 'POST':

            try {
                console.log(req.body)
                const { firstName, lastName, email, password } = req.body
                const userRecord = await Auth.registerUser({ firstName, lastName, email, password })
                await UserCollection.create({ uid: userRecord.uid, firstName, lastName, email })
                const token = await Auth.getCustomToken(userRecord.uid)
                res.status(200).json({ token })
            } catch (error) {
                console.log(error)
                res.status(200).json({ error: error.message })
            }

            break;

        default:
            // Invalid Method
            console.log(new Error('Invalid Method: ', method))
            res.status(404)
    }
}