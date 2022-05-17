
import { Auth } from "../../../../app/auth/auth.server"


export default async function handler(req, res) {

    const { method } = req
    const { id } = req.query

    switch (method) {
        case 'POST':
            try {

                const { email } = req.body
                console.log(email)
                const data = await Auth.updateAccount(id, { email })

                console.log(data)


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