const dotenv = require('dotenv');
const express = require('express');
const bodyParser =require('body-parser');
const axios = require('axios');
const cors = require('cors')


dotenv.config();
const app = express();
const port = process.env.PORT || 3300;
const mapsKey = process.env.MAPS_API;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/place/:input', (req, res) => {
    const input = req.params.input;
    let result = null;
    axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${mapsKey}`)
        .then(response => {
           console.log('success', response.data);
           result = response.data;
           res.status(200).json(result);
        })
        .catch(err => {
            throw new Error(err);
        });
});

app.get('/nearby/:input', (req, res) => {
    const input = req.params.input;
    let result = null;
    axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&rankby=distance&type=food&key=${mapsKey}`)
    .then(response => {
        console.log('success', response.data);
        result = response.data;
        res.status(200).json(result);
     })
     .catch(err => {
         throw new Error(err);
     });
});

app.get('/search/:input', (req, res) => {
    const _input = req.params.input;
    let result = null;
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json`, {
        params: {
            input: _input,
            inputtype: 'textquery',
            type: 'food',
            key: mapsKey
        }
    })
        .then(response => {
           console.log('success', response.data);
           result = response.data;
           res.status(200).json(result);
        })
        .catch(err => {
            throw new Error(err);
        });
});

app.listen(port, () => {
    console.log(`running at port ${port}`);
});