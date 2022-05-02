const { Database } = require(".")
const { admin } = require("../config/admin.config")




const SYSTEM_DATA = 'AppData'


class AppData {
    constructor() {
        this.db = new Database(SYSTEM_DATA)
        this.id = 'WE_CONNECT'
    }

    async update(data) {
        return { ... await this.db.update({ data: { lastRefresh: admin.firestore.Timestamp.now(), ... data}, id: this.id }).catch(error => { throw error }) }
    }


    async create({ currentBatch }) {
        const response = await this.db.create({ id: this.id, data: { lastRefresh: admin.firestore.Timestamp.now(), currentBatch: currentBatch, lastBatch: '' } })
            .catch(error => { throw error })

        return response
    }


    async exist() {
        const snapshot = await this.db.getReference(this.id).get().catch( error => { throw error })
        return snapshot.exists
    }

}

module.exports = {
    AppData: new AppData()
}