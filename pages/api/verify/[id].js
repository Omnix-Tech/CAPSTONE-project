import { LocationCollection } from "../../../app/models/Location"
import { UserCollection } from "../../../app/models/User"


const getContent = require('../../../utils/verification').handler

const getSentiment = async (article) => {
    const content = JSON.stringify({ article: article.content })
    return new Promise((resolve, reject) => {
        fetch(`${process.env.PYTHON_API_ORIGIN}/sentiment`, {
            method: 'POST',
            body: content,
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                const { analysis } = data
                resolve(analysis)
            })
            .catch(err => reject(err))
    })
}

export default async function handler(req, res) {

    const { method } = req
    const { id } = req.query

    switch (method) {

        case 'POST':

            try {
                const { location } = JSON.parse(req.body)

                await UserCollection.update({
                    id, data: {
                        isVerifying: true
                    }
                })

                const user = await UserCollection.get(id)
                const connect = await LocationCollection.get(location)

                const passages = await getContent({ name: `${user.firstName} ${user.lastName}`, area: connect.area, parish: connect.parish })

                var isVerified = true
                if (passages.length > 0) {
                    console.log('Checking Sentiment...')

                    var sentiments = []

                    for (var passageIndex = 0; passageIndex < passages.length; passageIndex++) {
                        const analysis = await getSentiment(passages[passageIndex]).catch(err => console.log(err))

                        analysis ? sentiments.push(passages[passageIndex]) : null
                    }

                    console.log(sentiments)
                    isVerified = sentiments.length === 0
                }

                await UserCollection.update({
                    id, data: {
                        isVerifying: false,
                        verified: isVerified,
                        verificationStatus: 'done'
                    }
                })

                res.status(200).json({ isVerified })


            } catch (error) {
                await UserCollection.update({
                    id, data: {
                        isVerifying: false
                    }
                })
                console.log(error)
                res.status(200).json({ error: error.message })
            }

            break;

        default:
            console.log(new Error('Invalid Method: ', method))
            res.status(404)

            break;
    }
}