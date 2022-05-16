const observer = require('./observer.news').handler
const loop = require('./loop.news').handler
const JCFNews = require('./jcf.news').handler
const jps = require('./jps').handler
const JCF = require('./jcf').handler


module.exports = {
    handler: async (limit = 1) => {
        var all_articles = []

        var articles = await observer(limit)
            .catch(error => {
                console.log('OBSERVER ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]
        console.log('Observer: ', all_articles.length)
        articles = null
        articles = await loop(limit)
            .catch(error => {
                console.log('LOOP ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]
        console.log("Loop: ", all_articles.length)
        articles = null
        articles = await JCFNews(limit)
            .catch(error => {
                console.log('JCF ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]
        console.log("JCF: ", all_articles.length)
        articles = null
        articles = await jps()
            .catch(error => {
                console.log('JPS ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]

        console.log("JPS: ", all_articles.length)
        articles = null
        articles = await JCF(true)
            .catch(error => {
                console.log('Wanted ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]
        console.log("Wanted: ", all_articles.length)

        articles = null
        articles = await JCF(false)
            .catch(error => {
                console.log('Missiong ERROR:: ', error)
            })

        all_articles = [...all_articles, ... (articles ? articles : [])]

        
        return all_articles
    }
}

