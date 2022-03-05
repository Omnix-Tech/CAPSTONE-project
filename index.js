require('dotenv').config();

const PORT = process.env.PORT
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()


// Manager Classes
const locationManager = require('./Business/Location/LocationsManager')()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({
    origin: "http://localhost:19006"
}))


app.get('/', async (req, res) => {


    res.json('WE-CONNECT-APIs')
})


app.post('/get/location', async (req, res) => {
    const { currentLocation } = req.body
    const coords = { lat: currentLocation.coords.latitude, lng: currentLocation.coords.longitude }

    const location = await locationManager.getClosestLocation(coords)
        .catch(error => console.log(error))
    res.json(location)

})

app.listen(PORT, () => console.log(`server is running of PORT ${PORT}`))
