// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { UserLocationCollection } = require('../../app/models/Location');

export default async function handler(req, res) {
    const { locationId, uid, location } = req.body

    try {
        console.log(uid, locationId)
        await UserLocationCollection.create({ uid, location_id: locationId }).catch(error => { throw error })
        
        res.status(200).json({})

    } catch (error) {
        console.log(error)
        res.status(200).json({ error: error.message })
    }
}
