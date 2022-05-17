
import { Auth } from "../../../../app/auth/auth.server"


export default async function handler(req, res) {

    const { method } = req
    const { id } = req.query

    switch (method) {
        case 'POST':
            try {

                const { password } = req.body
                await Auth.updateAccount(id, { password })


                res.status(200).json({ message: 'OK' })

            } catch (error) {

                console.log(error)
                res.status(200).json({ error: error.message })

            }
            break

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(405)
            break
    }
}