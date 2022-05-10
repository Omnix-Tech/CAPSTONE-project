const { Database } = require(".")
const { admin } = require("../config/admin.config")




const SYSTEM_DATA = 'AppData'


class AppData {
    constructor() {
        this.db = new Database(SYSTEM_DATA)
        this.id = 'WE_CONNECT'
    }

    async update({ data, setRefreshTime }) {
        const response = setRefreshTime ?
            await this.db.update({ data: { lastRefresh: admin.firestore.Timestamp.now(), ...data }, id: this.id }).catch(error => { throw error })
            :
            await this.db.update({ data, id: this.id }).catch(error => { throw error })

        return response
    }


    async create({ currentBatch, isUpdating }) {
        const response = await this.db.create({ id: this.id, data: { lastRefresh: admin.firestore.Timestamp.now(), currentBatch, lastBatch: '', isUpdating } })
                .catch(error => { throw error })

        return response
    }


    async exist() {
        const snapshot = await this.db.getReference(this.id).get().catch(error => { throw error })
        return snapshot.exists
    }

}

const AppDataCollection = new AppData()

module.exports = { AppDataCollection }