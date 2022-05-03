
const Twit = require('twit')

const apiKey = process.env.TWITTER_API_KEY
const apiSecretKey = process.env.TWITTER_API_SECRET
const accessToken = process.env.TWITTER_ACCESS_TOKEN
const accessSecret = process.env.TWITTER_ACCESS_SECRET


const T = new Twit({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token: accessToken,
    access_token_secret: accessSecret
})


const getTweets = async () => {

    return new Promise((resolve, reject) => {
        const now = (new Date()).getTime() - (24 * 3600000 * 3)
        const since = new Date(now)

        T.get('search/tweets', { q: `#MaintenanceOutageAdvisory since:${since.toISOString()}`, user_id: '353807705', lang: 'en' },
            (error, data, response) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(data)
                }
            })
    })
}


const tweet = async () => {
    const tweets = await getTweets().catch(error => { throw error })

    if (tweets.statuses) {
        const statuses = tweets.statuses

        const alerts = statuses.map(tweet => {
            return {
                media: 'https://scontent.fktp2-1.fna.fbcdn.net/v/t1.6435-9/123423705_3463762206996574_1736687254305026333_n.jpg?_nc_cat=109&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeFGqydDVUf4iRIlZgmd_qcrxryRA8siYDrGvJEDyyJgOm8FXR6pobMBv0b2cdYhlL_CCHuEDkX8m0mLB4X2_vDy&_nc_ohc=E-wdatfexygAX_XujaF&tn=Y-OhkiDELjbKs5_d&_nc_ht=scontent.fktp2-1.fna&oh=00_AT_bDCIajj-biembAYhhVHn-zsueWLwuaEQCeBomiPf2KQ&oe=6296482D',
                link: null,
                title: 'Power Outage In Your Area',
                source: 'Jamaica Public Service',
                origin: null,
                content: tweet.text,
                date: new Date(tweet.created_at)
            }
        })


        return alerts
    }
    return []
}


module.exports = {
    handler: tweet
}