const { AlertsCollection } = require('../../server/models/Alerts')



export default function handler(req, res) {
    const data =  req.body
    const { method } = req


    res.status(200).json({ data, method })
}