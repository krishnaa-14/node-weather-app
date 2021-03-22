const path = require('path');
const express = require('express');
const hbs = require('hbs');
const { title } = require('process');
const geoCode = require('./utils/geoCode.js')
const forecast = require('./utils/forecast.js')

console.log(__dirname);
console.log(path.join(__dirname,'../public'));

const app = express();

// Paths required in express
const pubDirectoryPath = path.join(__dirname,'../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setting up the paths 
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory 
app.use(express.static(pubDirectoryPath))


app.get('',(req,res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Krishna vamsi'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'About me',
        name : 'Krishna vamsi'
    });
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        name : 'Krishna vamsi'
    });
})

// app.com 
// app.com/help
// app.com/about


app.get('/products',(req,res) => {

    if(!req.query.search) {
        return res.send({
            error : 'provide a search term '
        });
    }

    console.log(req.query.search); 
    res.send({
        products : []
    })

})

app.get('/weather',(req,res) => {

    if(!req.query.address) {
        return res.send({
            error : 'Provide a valid location and Try Again !! '
        })
    }

    const address = req.query.address;



    geoCode(address, (error, data1 = {}) => {
        if(error) {
            return res.send({error});
        }
        else {
        // console.log(data);
            console.log('');
            console.log(data1.location);
            forecast(data1.latitude, data1.longitude, (error, data2 = {}) => {
                if(error) {
                    return res.send({
                        error : 'Provide a valid location and Try Again'
                    })
                }
                else {
                    res.send({
                        location : data1.location,
                        Weather : data2,
                    })
                }
            })
        }
    })
})

app.get('*',(req,res) => {

    // res.send('4O4 ERROR')
   res.render('error',{
       title : '404 ERROR',
       name : 'Krishna vamsi',
       errorMessage : 'Page Not found !!'
   });
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log("Server is running on port port");
})