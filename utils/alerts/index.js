const scrape = require('./scrape').handler

module.exports = {
    handler: async () => {
        const news = await scrape(2).catch(error => console.log(error))
        const articles = news.map( article => ({ 
            connects: { 
                primary: [], 
                secondary: [] 
            }, ...article 
        }))
        return articles
    }
}