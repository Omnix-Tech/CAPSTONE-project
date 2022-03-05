

const { admin, app } = require('../utils/firebase.config')


const firestore = admin.firestore(app)


class Firestoredb {
    constructor(collection) {
        this.collection = firestore.collection(collection)
    }


    async add(data, id = null) {
        console.log('Uploading to Firestore...')
        if (id) {
            await this.collection.doc(id).set(data).catch(error => { throw error })
            console.log('Done')
            return this.collection.doc(id)
        }
        const ref = await this.collection.add(data).catch(error => { throw error })
        console.log('Done')
        return ref
    }

    /**
     * @param {object} data values to be updated
     * @param {string} id Key for the document
     * @param {admin.firestore.DocumentReference<admin.firestore.DocumentData>} ref Reference to document
     */
    async update(data, id = null, ref = null) {
        if (ref) {
            await ref.update(data).catch(error => { throw error })
            return
        }
        await this.collection.doc(id).update(data).catch(error => { throw error })
        return
    }


    async select(fields) {
        const querySnap = await this.collection.select(fields).get().catch(error => { throw error })
        const docs = querySnap.docs       
        return docs
    }

    /**
     * 
     * @param {admin.firestore.DocumentReference<admin.firestore.DocumentData>} ref 
     */
    async getRefDoc(ref) {
        const doc = await ref.get().catch( error => { throw error })
        return doc.data()
    }

}



module.exports = {
    firestore: (collection) => new Firestoredb(collection)
}