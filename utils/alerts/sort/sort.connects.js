
const locations = require('../../locations/locations.json')



const searchArticle = ( keywords, article ) => {
    const results = keywords.map( keyword => {
        return article.search( keyword.toUpperCase() ) !== -1
    })

    return results.includes(true)
}

const sortConnects = ( articles ) => {
    const alerts = articles.map( article => {
        const content = article.content.toUpperCase()
        article['connects'] = {
            primary : [],
            secondary: []
        }

        locations.map( ({ keywords: { primary, secondary }, place_id } ) => {

            if ( searchArticle(primary, content) ) {

                article.connects.primary.push(place_id)
                
            } else if ( searchArticle(secondary, content)) {

                article.connects.secondary.push(place_id)

            }

        })

        return article
    })


    
    return alerts
}


module.exports = {
    handler: sortConnects
}