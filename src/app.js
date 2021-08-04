const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('views', viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get(
    '', (req, res) => {
        res.render('index', {
            title: 'Weather App',
            name: 'juan perez',
            author: 'pluto'
        })
    }
)
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        msg: 'te ayudo con node.js',
        author: 'juanito'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        author: 'neptuno'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide an address'})
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            const forecast = forecastData.description + '. It\'s currently ' + forecastData.temperature + ' degrees out, but feels like ' + forecastData.feel + '.'
            res.send({
                forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        errorTitle: 404,
        errorMessage: 'Help article not found'
    })
})

// 404 management
// cualquier cosa que no matchee antes
app.get('*', (req, res) => {
    res.render('404', {
        errorTitle: 404,
        errorMessage: 'Resource not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})