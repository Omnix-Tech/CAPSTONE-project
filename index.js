require('dotenv').config();

const PORT = process.env.PORT
const axios = require('axios')
const express = require('express')



const app =  express()



app.get('/', async (req, res) => {
    res.json('WE-CONNECT-APIs')
})


app.listen(PORT, () => console.log(`server is running of PORT ${PORT}`))
