const { getLocations } = require('../../../utils/locations/get.locations')

export default async function handler(req, res) {


    const { method } = req
    const { coords: [latitude, longitude] } = req.query

    switch (method) {
        case 'GET':

            try {
                const locations = getLocations({ lat: latitude, lng: longitude })
                res.status(200).json({ locations })
            } catch (error) {
                console.log(error)
                res.status(200).json({ error: error.message })
            }
            break;

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(404)
    }
}