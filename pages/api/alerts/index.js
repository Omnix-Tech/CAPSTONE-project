const { AlertsCollection } = require('../../../server/models/Alerts')
const { AppDataCollection } = require('../../../server/models/System')
const { v4: uuidv4 } = require('uuid')



const initializeAppData = async () => {
    if (await AppDataCollection.exist()) {
        await AppDataCollection.update({
            data: { isUpdating: true },
            setRefreshTime: false
        })
    } else {
        await AppDataCollection.create({ currentBatch: '', isUpdating: true })
    }
}


const deleteLastBatch = async (lastBatch) => {
    await AlertsCollection.deleteBatch({ batchID: lastBatch }).catch(error => { throw error })
    console.log('Deleting Old Batch...')
}


const createAlertDocument = async (presentBatch, doc) => {
    await AlertsCollection.create({
        data: { batchId: presentBatch, ...doc }
    })
}


const closeAppDataSession = async (currentBatch, presentBatch) => {
    if (currentBatch) {
        await AppDataCollection.update({
            data: {
                lastBatch: currentBatch,
                currentBatch: presentBatch,
                isUpdating: false
            },
            setRefreshTime: true
        })
    } else {
        await AppDataCollection.update({
            data: {
                lastBatch: '',
                currentBatch: presentBatch,
                isUpdating: false
            },
            setRefreshTime: true
        })
    }
}

const cancelAppDataSession = async () => {
    await AppDataCollection.update({
        data: {
            isUpdating: false
        }
    })
}


export default async function handler(req, res) {

    const { method } = req


    switch (method) {
        case 'POST':
            try {


                const { lastBatch, currentBatch } = req.body

                await initializeAppData()

                if (lastBatch) await deleteLastBatch(lastBatch)


                const presentBatch = uuidv4()
                const docs = await refreshAlerts()


                for (var docIndex = 0; docIndex < docs.length; docIndex++) await createAlertDocument(presentBatch, docs[docIndex])


                closeAppDataSession(currentBatch, presentBatch)
                console.log('--- DONE')

                res.status(200).json({ presentBatch })


            } catch (error) {

                await cancelAppDataSession()
                console.log(error)
                res.status(200).json({ error: error.message })


            }

            break;

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(405)
    }
}


