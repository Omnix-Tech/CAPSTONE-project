const observer = require('./observer.news').handler
const loop = require('./loop.news').handler
const jcf = require('./jcf.news').handler
const jps = require('./jps').handler


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

        articles = null
        articles = await jcf(limit)
            .catch(error => {
                console.log('JCF ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]

        articles = null
        articles = await jps()
            .catch(error => {
                console.log('JPS ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]

        
        return all_articles
    }
}

