const { default: axios } = require('axios')
const cheerio = require('cheerio')
const SOURCE_URL = 'https://jcf.gov.jm/jcfnews/'


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
    return element.find('.av-magazine-thumbnail > a > img').attr('src')
}

const getTitle = async (element) => {
    return await element.find('.av-magazine-content-wrap header h3').text()
}

const getLink = (element) => {
    return element.find('.av-magazine-thumbnail a').attr('href')
}

const getContent = async (element, origin) => {
    const url = getLink(element)
    const { html } = await getHTML(url)

    if (!html) return ''
    const $ = cheerio.load(html)
    var content = ''
    $('div.avia_textblock p').each((i, el) => {
        content = content.concat([$(el).text()])
    })

    return content
}

const getDate = (element) => {
    const time = element.find('.av-magazine-content-wrap header time.av-magazine-time').attr('datetime')
    return new Date(time)
}

const verifyArticle = (element, timeLimit) => {
    const publishDate = getDate(element).getTime()
    const difference = publishDate - timeLimit
    return difference <= 0 
}

const getArticles = async (html, origin, timeLimit) => {
    const $ = cheerio.load(html)
    const articleElements = []
    const articles = []
    var isComplete = false

    
    $('article.av-magazine-entry').each((i, el) => articleElements.push(el))


    // if (rows.length === 0) return { articles, isComplete }
    // const currentRow = rows.splice(-1)[0]

    // const articleElements = currentRow.children.map(el => $(el).find('.category_news_blk'))

    for (var elementIndex = 0; elementIndex < articleElements.length; elementIndex++) {

        const el = articleElements[elementIndex]
        isComplete = verifyArticle($(el), timeLimit)

        if (isComplete) break
        articles.push({
            media: getImageURL($(el)),
            link: getLink($(el)),
            title: await getTitle($(el)),
            source: 'Jamaica Constabulary Force',
            origin,
            content: await getContent($(el), origin),
            date: getDate($(el)),
            category: 'inform'
        })
    }

    return { articles, isComplete }
}

/**
 * 
 * @param {int} limit time in hrs, limit on the articles to retreive 
 */
module.exports = {
    handler: async (limit = 1) => {
        const hr = limit * 3600000
        const timeLimit = (new Date()).getTime() - hr

        const { html, origin } = await getHTML(SOURCE_URL).catch(error => console.log(error))
        var { articles, isComplete } = await getArticles(html, origin, timeLimit).catch(err => console.log(err))

        var $ = cheerio.load(html)
        var next_page = $('nav.pagination a.inactive.next_page').attr('href')
    


        while (!isComplete) {
            const { html, origin } = await getHTML(SOURCE_URL + next_page).catch(error => console.log(error))
            const response = await getArticles(html, origin, timeLimit).catch(err => console.log(err))
            isComplete = response.isComplete
            articles = [...articles, ...response.articles]

            $ = cheerio.load(html)
            next_page = $('nav.pagination a.inactive.next_page').attr('href')
            if (!next_page) break
        }

        return articles
    }
}