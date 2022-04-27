import { ResponseCollection } from "../../app/models/Response"



export default async function handler(req, res) {

    const { response_id } = req.body


    try {

        // Computation Start

        const response =  await ResponseCollection.remove(response_id)
        .catch( error => { throw error })



        // Computation End


        res.status(200).json()
        
    } catch (error) {
        
        console.log(error)
        res.status(200).json({ error: error.message })
    }

}