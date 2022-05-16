import { registerUser, getCustomToken } from "../../../app/auth/auth.admin";

import { UserCollection } from "../../../app/models/Users";

export default async function handler(req, res) {
    const { method } = req
    switch (method) {
        case 'POST':

            const { firstName, lastName, email, password } = JSON.parse(req.body)
            const record = await registerUser({ firstName, lastName, email, password })

            await UserCollection.create({ uid: record.uid, firstName, lastName, email })

            const token = await getCustomToken(record.uid)

            res.status(200).json({ token })


            break;

        default:
            // Invalid Method
            console.log(new Error('Invalid Method: ', method))
            res.status(405)
            break
    }
}