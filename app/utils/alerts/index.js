const scrape = require('./scrape').handler
const sort = require('./sort/sort.connects').handler

module.exports = {
    handler: async () => {
        const news = await scrape(24).catch(error => console.log(error))
        const articles = sort(news)
        
        return articles
    }
}