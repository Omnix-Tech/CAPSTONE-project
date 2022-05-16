const recognize = require('../../../utils/verification/face-identify').handler



export default async function handler(req, res) {


    const { method } = req

    switch (method) {
        case 'POST':
            try {

                const { sampleBuffer, idBuffer } = JSON.parse(req.body)
                const response = await recognize(sampleBuffer, idBuffer)

                console.log(response)
                res.status(200).json({ message: response })


            } catch (error) {

                console.log(error)
                res.status(200).json({ error: error.message })

            }

            break;

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(405)
    }
}