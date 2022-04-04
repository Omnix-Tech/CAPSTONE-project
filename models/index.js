
const { admin } = require('../config/admin.config')


const firestore = admin.firestore()
class Database {
    constructor(collection) {
        this.collection = firestore.collection(collection)
    }

    /**
     * 
     * @param {*} param0 
     * @param {admin.firestore.Transaction} transaction 
     * @returns 
     */
    async create({ data, id }, transaction = null) {
        if (id) {
            const ref = this.collection.doc(id)
            const res = transaction ? transaction.create(ref, data) : await ref.create(data).catch(error => {
                throw error;
            })


            return {
                res,
                ref
            }
        }

        const ref = await this.collection.add(data).catch(error => { throw error })

        return {
            res: null,
            ref
        }
    }

    async update({ data, id, ref }) {
        const docRef = ref ? ref : this.collection.doc(id)
        const writeResult = await docRef.update(data).catch( error => { throw error })

        return {
            writeResult
        }
    }


    async remove(id) {
        const docRef = this.collection.doc(id)
        const writeResult = await docRef.delete().catch(error => { throw error })

        return writeResult
    }

    getReference(id) {
        return this.collection.doc(id)
    }
}


module.exports = {
    Database,
    firestore
}