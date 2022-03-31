// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { UserLocationCollection } = require('../../models/Location');

export default async function handler(req, res) {
    const { locationId, uid, location } = req.body


    try {

        UserLocationCollection.create({ uid, location_id: locationId }).catch(error => { throw error })
        res.status(200).json({ })

    } catch (error) {

        res.status(200).json({ error: error.message })
    }
}
