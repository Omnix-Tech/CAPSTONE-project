import { ForumCollection, UserForumCollection } from "../../app/models/Forum"




export default async function handler(req, res) {

    const { forum, user } = req.body


    try {

        // Computation Start

        const response =  await UserForumCollection.create({ forum: ForumCollection.getReference(forum), user, status: 'member' })
        .catch( error => { throw error })


        // Computation End


        res.status(200).json()
        
    } catch (error) {
        
        console.log(error)
        res.status(200).json({ error: error.message })
    }

}