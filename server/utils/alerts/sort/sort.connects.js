
const locations = require('../../locations/locations.json')



const searchArticle = (keywords, article) => {
    const results = keywords.map(keyword => {
        const word = keyword.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        return article.search(word) !== -1
    })

    return results.includes(true)
}

const sortConnects = (articles) => {
    const alerts = articles.map(article => {
        const content = article.content.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        article['connects'] = []

        locations.map(({ keywords, place_id, parish }) => {

            if (searchArticle(keywords, content)) {

                article.connects.push({ id: place_id, parish })

            }

        })

        return article
    })



    return alerts
}


module.exports = {
    handler: sortConnects
}