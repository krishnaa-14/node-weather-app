const request = require('request');

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=3417fda18fda03e5db88dfbe592ef85e&query=' + latitude +',' + longitude + '&units=f';

    request({url : url, json : true},(error,response) => {
        if(error) {
            callback('Hey sorry!! May be weather stack API is down');
        }
        else if(response.body.error) {
            callback('Check your Location and Try again !!');
        }
        else {
            callback(undefined,response.body.current.weather_descriptions + ". It is currently " + response.body.current.temperature + " degrees out ." + "It feels like  " + response.body.current.feelslike + " degrees out .");         
        }
    })

}

module.exports = forecast;