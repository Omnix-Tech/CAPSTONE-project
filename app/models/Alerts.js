const { Database } = require(".");
const { AlertLocationCollection } = require("./Location");



const ALERT_COLLECTION = 'Alerts'


class Alert {
    constructor() {
        this.db = new Database(ALERT_COLLECTION)
    }


    async update(data, { id, ref }) {
        return { ... await this.db.update({ data, id, ref }).catch(error => { throw error }) }
    }


    async create({ id, data: { connects: { primary, secondary }, batchID, ...alert } }) {
        const response = await this.db.create({ id, data: { batchID, ...alert } })
            .catch(error => { throw error })


        for (var index = 0; index < primary.length; index++) {
            await AlertLocationCollection.create({
                alert: response.ref,
                location_id: primary[index],
                status: 'primary',
                batchID
            }).catch( error => {})
        }


        for (var index = 0; index < secondary.length; index++) {
            await AlertLocationCollection.create({
                alert: response.ref,
                location_id: secondary[index],
                status: 'secondary',
                batchID
            }).catch( error => {})
        }

        return response
    }


    async deleteBatch({ batchID }) {
        const query = this.db.collection.where('batchID', '==', batchID)
        query.get().then(async querySnapshot => {
            const docs = querySnapshot.docs

            for (var index = 0; index < docs.length; index++) {
                await this.remove(docs[index].id)
            }

        }).catch(error => {
            throw error
        })
    }


    async remove(id) {
        return await this.db.remove(id)
    }
}



module.exports = {
    AlertsCollection: new Alert()
}