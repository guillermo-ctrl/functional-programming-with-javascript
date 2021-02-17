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

/*
need this data:
Launch Date
Landing Date
Status
Most recently available photos
Date the most recent photos were taken
*/


//This determins what happens in root. It gives access to elements in "public" folder
app.use('/', express.static(path.join(__dirname, '../public')))

// all rovers general information API call 
app.get('/all', async (req, res) => {
    // Prepare output in JSON format
    try {
        let image = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
        res.send({image})
    } catch (err) {
        console.log('error:', err);
    }
})


// the following is the listener to start the server
app.listen(port, () => console.log(`Rover dashboard listening on port ${port}!`))