const observer = require('./observer.news').handler
const loop = require('./loop.news').handler




module.exports = {
    handler: async (limit = 1) => {
        var all_articles = []

        var articles = await observer(limit)
            .catch(error => {
                console.log('OBSERVER ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]

        articles = null
        articles = await loop(limit)
            .catch(error => {
                console.log('LOOP ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]


        return all_articles
    }
}

