const express = require('express');
const bodyParser =require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3300;
const key = ''

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/places/:input', (req, res) => {
    const input = req.params.input;
    let result = null;
    axios.get(`https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${input}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&key=${key}`)
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