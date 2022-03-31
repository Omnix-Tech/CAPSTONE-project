
const {getLocations} = require('../../utils/get.locations')

export default async function handler(req, res) {
    const { latitude, longitude } = req.body


    try {
        const locations = getLocations({ lat: latitude, lng: longitude })
        res.status(200).json({locations})
    } catch (error) {
        res.status(200).json({ error: error.message })
    }


}