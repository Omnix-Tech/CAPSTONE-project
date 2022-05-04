

const wanted = require('../../utils/alerts/scrape/jcf').handler
export default async function handler(req, res) {





    try {

        // Computation Start

        const data = await wanted(false).catch(error => console.log(error))




        // Computation End


        res.status(200).json({ status: 'done', data })

    } catch (error) {
        console.log(error)
        res.status(200).json({ error: error.message })
    }

}