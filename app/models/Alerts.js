
const { Database } = require(".");
const { LocationCollection } = require("./Location");



const ALERT_COLLECTION = 'Alerts'


class Alert {
    constructor() {
        this.db = new Database(ALERT_COLLECTION)
    }


    async update(data, { id, ref }) {
        return { ... await this.db.update({ data, id, ref }).catch(error => { throw error }) }
    }


    async create({ id, data: { connects, batchID, ...alert } }) {
        const locations = connects.map(connect => LocationCollection.getReference(connect.id))
        const parishes = connects.map(connect => connect.parish)

        const response = await this.db.create({ id, data: { batchID, connects: locations, parishes, ...alert } })
            .catch(error => { throw error })

        return response
    }


    async deleteBatch({ batchID }) {
        const query = this.db.collection.where('batchID', '==', batchID)
        const querySnapshot = await query.get().catch(error => {
            throw error
        })
        const docs = querySnapshot.docs

        for (var index = 0; index < docs.length; index++) {
            await this.remove(docs[index].id)
        }
    }


    async remove(id) {
        return await this.db.remove(id)
    }
}


const AlertsCollection = new Alert()

module.exports = { AlertsCollection }