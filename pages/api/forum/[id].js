import { ForumCollection, UserForumCollection } from "../../../app/models/Forum";


export default async function handler(req, res) {


    const { method } = req
    const { id } = req.query

    switch (method) {
        case 'POST':
            const { uid } = req.body

            try {
                await UserForumCollection.create({ forum: ForumCollection.getReference(id), uid, status: 'member' })
                res.status(200).json()
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