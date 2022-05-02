import { AlertsCollection } from '../../app/models/Alerts';
import { AlertLocationCollection } from '../../app/models/Location';
import { AppData } from '../../app/models/System';


const refreshAlerts = require('../../utils/alerts').handler
const { v4: uuidv4 } = require('uuid');


export default async function handler(req, res) {

    const { lastBatch, currentBatch } = req.body

    try {

        // Computation Start

        if (lastBatch) {
            await AlertsCollection.deleteBatch({ batchID: lastBatch }).catch(error => { throw error })
            await AlertLocationCollection.deleteBatch({ batchID: lastBatch }).catch(error => { throw error })
        }

        const presentBatch = uuidv4()
        const alerts = await refreshAlerts().catch(error => { throw error })

        for (var alertIndex = 0; alertIndex < alerts.length; alertIndex++) {
            await AlertsCollection.create({
                data: { batchID: presentBatch, ...alerts[alertIndex] }
            }).catch(error => { throw error })
        }

        if (currentBatch) {
            if (await AppData.exist()) {
                
                await AppData.update({
                    lastBatch: currentBatch,
                    currentBatch: presentBatch
                }).catch(error => { throw error })

            } else {

                await AppData.create({ currentBatch: presentBatch })
                    .catch(error => { throw error })

            }

        } else {
            if (await AppData.exist()) {
                
                await AppData.update({
                    lastBatch: '',
                    currentBatch: presentBatch
                }).catch(error => { throw error })

            } else {

                await AppData.create({ currentBatch: presentBatch })
                    .catch(error => { throw error })

            }

        }

        res.status(200).json({ presentBatch })

    } catch (error) {

        console.log(error)
        res.status(200).json({ error: error.message })
    }

}