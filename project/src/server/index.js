
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

// example API call (apod)
app.get('/apod', async (req, res) => {
    // Prepare output in JSON format
    
    try {
        let image = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`)
            .then(res => res.json())
    
            /*console.log(image.date)
        res.send(image.date)*/
        res.send({image})
    } catch (err) {
        console.log('error:', err);
    }
})

// the following is the listener to start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`))