const { admin } = require('../config')


const firestore = admin.firestore()


class Database {
    constructor(collection) {
        this.collection_name = collection
        this.collection = firestore.collection(this.collection_name)
    }

    async create({ data, id }) {

        this.collection.add(data)

        if (id) {
            const ref = firestore.doc(`${this.collection_name}/${id}`)
            const writeResult = await ref.create(data).catch(error => {
                throw error;
            })


            return {
                writeResult,
                ref
            }
        }

        const ref = await this.collection.add(data).catch(error => { throw error })

        return {
            writeResult: null,
            ref
        }
    }

    async update({ data, id, ref }) {
        const docRef = ref ? ref : firestore.doc(`${this.collection_name}/${id}`)
        const writeResult = await docRef.update(data).catch( error => { throw error })

        return {
            writeResult
        }
    }

    getReference(id) {
        return firestore.doc(`${this.collection_name}/${id}`)
    }
}


module.exports = {
    Database
}