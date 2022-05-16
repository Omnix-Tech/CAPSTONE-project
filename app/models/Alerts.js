const { DatabaseManager } = require('.')
const { LocationCollection } = require('./Locations')



const ALERT_COLLECTION = 'Alerts'

class Alerts extends DatabaseManager {
    constructor() {
        super(ALERT_COLLECTION)
    }

    async create({ data: { connects, batchId, ...alert }, id }) {

        const locations = connects.map(connect => LocationCollection.getReference(connect.id))
        const parishes = connects.map(connect => connect.parish)


        return await super.create({
            data: {
                batchId, connects: locations, parishes, ...alert
            }, id
        })
    }

    async deleteBatch({ batchId }) {
        const query = super.collection.where('batchId', '==', batchId)
        const querySnapshot = await query.get().catch(error => {
            throw error
        })
        const docs = querySnapshot.docs

        for (var index = 0; index < docs.length; index++) {
            await super.remove(docs[index].id)
        }
    }
}

const AlertsCollection = new Alerts()

module.exports = { AlertsCollection }