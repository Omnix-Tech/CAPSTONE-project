const recognize = require('../../../utils/verification/face-identify').handler
export default async function handler(req, res) {


    const { method } = req

    switch (method) {
        case 'POST':
            try {

                const { sampleBuffer, officialBuffer } = JSON.parse(req.body)
                
                const res = await recognize(sampleBuffer, officialBuffer)

                console.log(res)

                res.status(200).json({ message: res })


            } catch (error) {

                console.log(error)
                res.status(500)

            }

            break;

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(404)
    }
}