const { DatabaseManager } = require('.')
const { admin } = require('../config/admin.config')

const SYSTEM_DATA = 'AppData'
const SYSTEM_DOC = 'WE_CONNECT'


class AppData extends DatabaseManager {
    constructor() {
        super(SYSTEM_DATA)
        this.id = SYSTEM_DOC
    }

    async update({ data, setRefreshTime }) {

        if (setRefreshTime) {

        }
        return setRefreshTime ? await super.update({
            id: this.id,
            data: {
                lastRefresh: admin.firestore.Timestamp.now(),
                ...data
            }
        })
            :
            await super.create({ id: this.id, data })
    }


    async create({ currentBatch, isUpdating }) {
        const response = await super.create({ id: this.id, data: { lastRefresh: admin.firestore.Timestamp.now(), currentBatch, lastBatch: '', isUpdating } })
            .catch(err => { throw err })
        return response
    }


    async exist() {
        const snapshot = await super.getReference(this.id).get().catch(err => { throw err })

        return snapshot.exists
    }
}


const AppDataCollection = new AppData()

module.exports = { AppDataCollection }