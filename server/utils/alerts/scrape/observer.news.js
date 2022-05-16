const { default: axios } = require('axios')
const cheerio = require('cheerio')
const SOURCE_URL = 'https://www.jamaicaobserver.com/latest-news'


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
    return element.find('a.image-wrapper > img.image').attr('src')
}

const getLink = (element) => {
    return element.find('a.image-wrapper').attr('href')
}

const getTitle = async (element) => {
    return await element.find('div.article-meta > div.headline > a').text()
}

const getContent = async (element, origin) => {
    const url = getLink(element)
    const { html } = await getHTML(url)

    if (!html) return ''
    const $ = cheerio.load(html)
    var content = ''
    $('div.article-restofcontent p.article__body').each((i, el) => {
        content = content.concat([$(el).text()])
    })

    return content
}

const getDate = (element) => {
    const date_exp = (element.find('div.article-meta > .pubdate').text()).replace(/(\r\n|\n|\r)/gm, "").replace(/\s{2,}/g, ' ').trim()

    try {
        if (date_exp.includes('hours ago')) {
            const currentDate = new Date()
            const currentTimeInMLSeconds = currentDate.getTime()
            const hour = date_exp.split(' ')[0]

            const hoursAgoInMLSeconds = parseInt(hour) * 60 * 60 * 1000

            return new Date(currentTimeInMLSeconds - hoursAgoInMLSeconds)
        }
        if (date_exp) return new Date(date_exp)

    } catch {
        return new Date()
    }


}

const verifyArticle = (element, timeLimit) => {
    const date = getDate(element)
    const publishDate = date ? date.getTime() : null

    if (publishDate) {
        const difference = publishDate - timeLimit

        return difference <= 0
    }
    return true
}


const getArticles = async (html, origin, timeLimit) => {
    const $ = cheerio.load(html)
    var articles = []
    var isComplete = false

    const articleElements = []

    $('div.section-list .article-wrapper').each((i, el) => articleElements.push(el))

    for (var elementIndex = 0; elementIndex < articleElements.length; elementIndex++) {
        const el = $(articleElements[elementIndex])

        isComplete = verifyArticle($(el), timeLimit)
        if (isComplete) break

        articles.push({
            media: getImageURL(el),
            link: getLink(el),
            title: await getTitle(el),
            source: 'Jamaica Observer',
            origin,
            content: await getContent(el, origin),
            date: getDate(el),
            category: 'inform'
        })
    }

    return {
        articles, isComplete
    }
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
        var { articles, isComplete } = await getArticles(html, origin, timeLimit).catch(err => console.log('Error Occured here: ', err))


        var $ = cheerio.load(html)
        var next_page = $('.paginator .page-next a.link').attr('href')

        while (!isComplete) {
            const { html, origin } = await getHTML(next_page).catch(error => console.log(error))

            if (!html) return articles
            const response = await getArticles(html, origin, timeLimit).catch(err => console.log(err))
            isComplete = response.isComplete
            articles = [...articles, ...response.articles]



            $ = cheerio.load(html)
            next_page = $('paginator > page-next > a.link').attr('href')
            if (!next_page) break

        }

        return articles
    }
}