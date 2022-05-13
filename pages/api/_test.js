

const getSentiment = async (article) => {
    const content = JSON.stringify({ article: article.content })
    console.log(content)
    return new Promise((resolve, reject) => {
        fetch('http://127.0.0.1:8080/sentiment', {
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





    try {

        // Computation Start

        const data = await getSentiment({ content: 'The unfortunate family was murdered following the incident involving the two teenage boys.'}).catch(err => { throw err })
        res.status(200).json({ data })

    } catch (error) {
        console.log(error)
        res.status(200).json({ error: error.message })
    }

}