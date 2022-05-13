const scrape = require('../alerts/scrape').handler

const search = (keywords, article) => {
    const results = keywords.map(keyword => {
        const word = keyword.toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        return article.search(word) !== -1
    })

    return (results[0] && results[1] && results[2]) | (results[0] && results[1]) | (results[0] && results[2])
}

module.exports = {
    handler: async ({ name, area, parish }) => {
        const articles = await scrape(144)

        const matches = articles.filter( ({ title, content }) => {
            const passage = (`${title} \n ${content}`).toUpperCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
            return search([name, area, parish], passage)
        })

        return matches
    }
} 