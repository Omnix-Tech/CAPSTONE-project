// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { UserLocationCollection } = require('../../app/models/Location');

export default async function handler(req, res) {
    const { locationId, uid, community } = req.body

    try {
        await UserLocationCollection.create({ uid, location_id: locationId }).catch(error => { throw error })
        if (community && community !== '') {

        }
        
        res.status(200).json({})

    } catch (error) {
        console.log(error)
        res.status(200).json({ error: error.message })
    }
}
