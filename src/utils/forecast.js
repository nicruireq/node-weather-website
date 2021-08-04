const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fc7de05a23013a6d644b0f2b177e3a94&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const temperature = body.current.temperature
            const feel = body.current.feelslike
            const description = body.current.weather_descriptions[0]
            callback(undefined, {
                temperature,
                feel,
                description
            })
        }
    })
}

module.exports = forecast