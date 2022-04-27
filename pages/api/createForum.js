const { ForumCollection } = require("../../app/models/Forum")


export default async function handler(req, res) {
    
    // user_id --- uid of user creating the forum
    // forum_title --- title of the forum
    // description --- description of the forum
    // connects --- Array of conneect ids the forum will be available to
    const { user_id, forum_title, description, connects } = req.body


    try {
        const response = await ForumCollection.create({ user_id, forum_title, description, connects })
        .catch( error => { console.log('error'); throw error })
        res.status(200).json()
        
    } catch (error) {
        res.status(200).json({ error: error.message })
    }

}