const request = require('request');

const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoia3Jpc2huYTExMTQiLCJhIjoiY2ttaGszNmFuMDgycjJ6bnp6NzE1enk1OSJ9.Fny54z3M0ASrNI04HIxhIQ&limit=1';
    
    request({url : url, json : true},(error,response) => {
        if(error) {
            callback("Geocode API is not able to connect, may be not working");
        }
        else if(response.body.features.length === 0) {
            callback("Unable to find location , Try again");
        }
        else {
            const data = {
                latitude : response.body.features[0].center[1],
                longitide : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            }

            callback(undefined,data);

        }
    })
    
}

module.exports = geoCode;