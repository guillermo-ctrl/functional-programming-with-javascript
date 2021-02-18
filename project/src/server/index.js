//required stuff to run server
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//This determins what happens in root. It gives access to elements in "public" folder
app.use('/', express.static(path.join(__dirname, '../public')))

// all rovers general information API call 
app.get('/all', async (req, res) => {
    // Prepare output in JSON format
    try {
        let info = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({info})
    } catch (err) {
        console.log('error:', err);
    }
})

// curiosity latest pictures API call 
app.get('/curiositypictures', async (req, res) => {
    // Prepare output in JSON format
    try {
        //check what the date of the last picture is
        const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
            .then(res => res.json())).rovers[0].max_date
        //fetch the picture(s) from the last available date
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${maxdate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({image})
    } catch (err) {
        console.log('error:', err);
    }
})

// spirit latest pictures API call 
app.get('/spiritpictures', async (req, res) => {
    // Prepare output in JSON format
    try {
        //check what the date of the last picture is
        const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
            .then(res => res.json())).rovers[1].max_date
        //fetch the picture(s) from the last available date
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${maxdate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({image})
    } catch (err) {
        console.log('error:', err);
    }
})

// opportunity latest pictures API call 
app.get('/opportunitypictures', async (req, res) => {
    // Prepare output in JSON format
    try {
        //check what the date of the last picture is
        const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
            .then(res => res.json())).rovers[2].max_date
        //fetch the picture(s) from the last available date
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${maxdate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({image})
    } catch (err) {
        console.log('error:', err);
    }
})

// the following is the listener to start the server
app.listen(port, () => console.log(`Rover dashboard listening on port ${port}!`))