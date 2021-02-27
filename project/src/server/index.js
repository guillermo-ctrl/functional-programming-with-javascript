require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const path = require('path')
const Immutable = require('immutable');
const map1 = Immutable.Map({ a: 1, b: 2, c: 3 });

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../public')))

// curiosity latest pictures API call 
app.get('/curiosity', async (req, res) => {
    // Prepare output in JSON format
    try {
        //check what the date of the last picture is
        const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
            .then(res => res.json())).rovers[0].max_date
        //fetch the picture(s) from the last available date
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${maxdate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send(Immutable.Map({image}))
    } catch (err) {
        console.log('error:', err);
    }
})

// spirit latest pictures API call 
app.get('/spirit', async (req, res) => {
    // Prepare output in JSON format
    try {
        //check what the date of the last picture is
        const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
            .then(res => res.json())).rovers[1].max_date
        //fetch the picture(s) from the last available date
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?earth_date=${maxdate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send(Immutable.Map({image}))
    } catch (err) {
        console.log('error:', err);
    }
})

// opportunity latest pictures API call 
app.get('/opportunity', async (req, res) => {
    // Prepare output in JSON format
    try {
        //check what the date of the last picture is
        const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
            .then(res => res.json())).rovers[2].max_date
        //fetch the picture(s) from the last available date
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?earth_date=${maxdate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send(Immutable.Map({image}))
    } catch (err) {
        console.log('error:', err);
    }
})

// perseverance latest pictures API call 
app.get('/perseverance', async (req, res) => {
    // Prepare output in JSON format
    try {
        //check what the date of the last picture is
        const maxdate = (await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
            .then(res => res.json())).rovers[3].max_date
    
        //fetch the picture(s) from the last available date
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?earth_date=${maxdate}&api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send(Immutable.Map({image}))
    } catch (err) {
        console.log('error:', err);
    }
})

app.listen(port, () => console.log(`Rover dashboard listening on port ${port}!`))