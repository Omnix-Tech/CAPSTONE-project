const { default: axios } = require('axios')
const cheerio = require('cheerio')
const WANTED_SOURCE_URL = 'https://jcf.gov.jm/missing-person-3/missing-person-2/'
const MISSING_SOURCE_URL = 'https://jcf.gov.jm/missing-person-3/missing-persons/'


const getHTML = async (url) => {
    const origin = (new URL(url)).origin
    try {
        const res = await axios.get(url)
        return { origin, html: res.data ? res.data : '' }
    } catch (error) {
        return { origin, html: '' }
    }
}

const getImageURL = (element) => {
    const image = element.find('a.grid-image > img').attr('src')
    return image ? image : ''
}

const getTitle = async (element) => {
    return await element.find('a.grid-image').attr('title')
}

const getLink = (element) => {
    return element.find('a.grid-image').attr('href')
}

const getContent = async (element, origin) => {
    return await element.find('.grid-content .entry-content').text()
}

const getDate = (element) => {
    return new Date()
}

const verifyArticle = (element, timeLimit) => {
    const publishDate = getDate(element).getTime()
    const difference = publishDate - timeLimit
    return difference <= 0 
}

const getArticles = async (html, origin, timeLimit, isWanted) => {
    const $ = cheerio.load(html)
    const articleElements = []
    const articles = []
    var isComplete = false

    
    $('.grid-sort-container .grid-entry article').each((i, el) => articleElements.push(el))


    for (var elementIndex = 0; elementIndex < articleElements.length; elementIndex++) {

        const el = articleElements[elementIndex]
        isComplete = verifyArticle($(el), timeLimit)

        if (isComplete) break
        articles.push({
            media: getImageURL($(el)),
            link: getLink($(el)),
            title: `${isWanted ? 'Wanted' : 'Missing'} ${await getTitle($(el))} `,
            source: 'Jamaica Constabulary Force',
            origin,
            content: await getContent($(el), origin),
            date: new Date(),
            category: isWanted ? 'wanted' : 'missing'
        })
    }

    return { articles, isComplete }
}

/**
 * 
 * @param {int} limit time in hrs, limit on the articles to retreive 
 */
module.exports = {
    handler: async (isWanted) => {
        const hr = 1 * 3600000
        const timeLimit = (new Date()).getTime() - hr

        const { html, origin } = await getHTML( isWanted ? WANTED_SOURCE_URL : MISSING_SOURCE_URL ).catch(error => console.log(error))
        var { articles, isComplete } = await getArticles(html, origin, timeLimit, isWanted).catch(err => console.log(err))

        var $ = cheerio.load(html)
        var next_page = $('nav.pagination a.inactive.next_page').attr('href')


        while (!isComplete) {
            const { html, origin } = await getHTML(next_page).catch(error => console.log(error))
           
            const response = await getArticles(html, origin, timeLimit, isWanted).catch(err => console.log(err))
            isComplete = response.isComplete
            articles = [...articles, ...response.articles]

            $ = cheerio.load(html)
            next_page = $('nav.pagination a.inactive.next_page').attr('href')

            if (!next_page) break
        }

        return articles
    }
}