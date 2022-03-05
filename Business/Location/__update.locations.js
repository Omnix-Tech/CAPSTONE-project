require('dotenv').config()

const GOOGLE_API = process.env.GOOGLE_API
const axios = require('axios');
const cheerio = require('cheerio');

var divisions, geolocations


const generateConstituency = (name, constituence, party) => {
    var cons = constituence.split(' ')
    var parish

    if (cons[0] === 'St.') {
        parish = `${cons[0]} ${cons[1]}`
    } else {
        parish = cons[0]
    }

    return { member: name, parish, name: constituence, party }
}


const getConstituencies = async () => {

    const response = await axios.get('https://jis.gov.jm/government/members-of-parliament/').catch(error => { throw error })
    var constituencies = []
    const html = response.data
    const $ = cheerio.load(html)
    const elemSelector = "#post-105277 > div.entry-content > table:nth-child(8) > tbody > tr"
    const elemSelectorII = "#post-105277 > div.entry-content > table:nth-child(14) > tbody > tr"


    $(elemSelector, html).each((parentIdx, parentElm) => {
        let count = 0
        let name, conts

        $(parentElm).children().each((childInx, childElm) => {

            if (count === 0) {
                name = $(childElm).text()
            } else {
                conts = $(childElm).text()
            }

            count++
        })

        if (name != "NAME" | conts != "CONSTITUENCY") {
            constituencies.push(generateConstituency(name, conts, "JLP"))
        }
    })

    $(elemSelectorII, html).each((parentIdx, parentElm) => {
        let count = 0
        let name, conts

        $(parentElm).children().each((childInx, childElm) => {

            if (count === 0) {
                name = $(childElm).text()
            } else {
                conts = $(childElm).text()
            }

            count++
        })

        if (name != "NAME" | conts != "CONSTITUENCY") {
            constituencies.push(generateConstituency(name, conts, "PNP"))
        }

    })

    return constituencies
}


const getDivisions = async () => {
    const PAGE_COUNT = 24
    var divisions = []
    var page = 1

    console.log('Identifying Divisions')
    while (page <= PAGE_COUNT) {
        const response = await axios.get(`https://www.localgovjamaica.gov.jm/councillors/?sf_paged=${page}`).catch(error => { throw error })

        const html = response.data
        const $ = cheerio.load(html)
        const elemSelector = "#main > div.search-filter-results.table > div.row"

        $(elemSelector, html).each((parentIdx, parentElm) => {
            let name, party, conts, div, email
            let count = 0

            $(parentElm).children().each((childIndx, childElm) => {

                if (count === 0) {
                    null
                } else if (count === 1) {
                    if (!$(childElm).text().includes("Name"))
                        name = $(childElm).text()
                } else if (count === 2) {
                    if (!$(childElm).text().includes("Party"))
                        party = $(childElm).text()
                } else if (count === 3) {
                    if (!$(childElm).text().includes("Constituency"))
                        conts = $(childElm).text()
                } else if (count === 4) {
                    if (!$(childElm).text().includes("Electoral Division"))
                        div = $(childElm).text()
                } else if (count === 5) {
                    if (!$(childElm).text().includes("Email"))
                        email = $(childElm).text()
                }
                count++
            })

            if (name != undefined | div != undefined | email != undefined | party != undefined | conts != undefined) {
                var councillor = []
                name.replace(/\t/g, '').replace(/\n/g, '').replace(/\r/g, '').split(" ").map(char => {
                    if (char != "") {
                        councillor.push(char)
                    }
                })

                var area = []
                div.replace(/\t/g, '').replace(/\n/g, '').replace(/\r/g, '').split(" ").map(char => {
                    if (char != "") {
                        area.push(char)
                    }
                })

                var emailVal = []
                email.replace(/\t/g, '').replace(/\n/g, '').replace(/\r/g, '').split(" ").map(char => {
                    if (char != "") {
                        emailVal.push(char)
                    }
                })

                var partyVal = []
                party.replace(/\t/g, '').replace(/\n/g, '').replace(/\r/g, '').split(" ").map(char => {
                    if (char != "") {
                        partyVal.push(char)
                    }
                })


                var constituence = []
                conts.replace(/\t/g, '').replace(/\n/g, '').replace(/\r/g, '').split(" ").map(char => {
                    if (char != "") {
                        constituence.push(char)
                    }
                })

                let parish
                if (constituence[0] === "ST.") {
                    parish = constituence[0] + " " + constituence[1]
                } else {
                    parish = constituence[0]
                }



                var division = {
                    councilor: councillor.join(" "),
                    area: area.join(" "),
                    email: emailVal.join(" "),
                    party: partyVal.join(" "),
                    constituence: constituence.join(" ").replace("&", "AND"),
                    parish: parish,
                    address: area.join(" ") + ", " + parish + " " + "JAMAICA"
                }
                divisions.push(division)
            }


        })

        page++
    }


    return divisions
}


const getLocations = async () => {
    var geolocations = []
    
    try {
        divisions = await getDivisions()
        console.log('Acquiring Geolocations')
        for (var divisionsIndex = 0; divisionsIndex < divisions.length; divisionsIndex++) {

            const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                params: {
                    address: divisions[divisionsIndex].address,
                    key: GOOGLE_API
                }
            })

            const data = response.data
            geolocations.push(data)
        }

    } catch (error) {
        console.log(error)
        throw error
    }


    return geolocations
}

const check = (str1, str2) => {
    var str1 = str1.split(' ')
    var str2 = str2.split(' ')
    var matches = []
    str1.forEach(strng1 => {
        str2.forEach(strng2 => {
            if (strng1 === strng2) {
                matches.push(strng1)
            }
        })
    })

    return matches.join(' ')
}


const sanitize_locations_data = async () => {
    var connect_locations = []
    
    try {

        geolocations = await getLocations()
        console.log('Sanitizing Data')
        var locations = []
        divisions.forEach((location, index) => {
            location = {
                area: location.area,
                parish: location.parish,
                councillors: [
                    {
                        name: location.councilor,
                        email: location.email,
                        area: location.area,
                        parish: location.parish,
                        constituence: location.constituence,
                        party: location.party
                    }
                ],
                address: geolocations[index].results[0].formatted_address,
                place_id: geolocations[index].results[0].place_id,
                location: geolocations[index].results[0].geometry.location
            }

            locations.push(location)
        })

        var registered = []
        locations.forEach(location => {
            if (registered.includes(location.place_id)) {
                const registeredIndex = registered.indexOf(location.place_id)
                connect_locations[registeredIndex].councillors.push(location.councillors[0])
            } else {
                registered.push(location.place_id)
                connect_locations.push(location)
            }
        })

        connect_locations.forEach((location, index) => {
            const areas = location.councillors.map(data => data.area)

            if (areas.length > 1) {
                var common_area = check(areas[0], areas[1])

                if (common_area === '') {
                    common_area = areas[0]
                    areas.forEach( area => {
                        if (!area.includes(common_area)) {
                            common_area = area
                        }
                    })
                } else {
                    areas.forEach( area => {
                        if (!area.includes(common_area)) {
                            common_area = check(common_area, area)
                        }
                    })
                }

                connect_locations[index].area = common_area
            }
        })

    } catch (error) {
        console.log(error)
        throw error
    }

    return connect_locations
}



module.exports = async () => {
    console.log('\n\nPlease wait...')
    const locations = await sanitize_locations_data().catch(error => console.log(error))
    console.log('\n\nDone...')

    return locations
}















