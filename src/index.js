const express = require('express')
const path = require('path')
const cors = require('cors')
const app = express()
const axios = require('axios');
const history = require('connect-history-api-fallback')
require('dotenv').config()

app.use(express.static('src/dist'));

app.use(cors())
app.use(history())

app.get('/*', function(req,res){
    res.sendfile(__dirname + '/src/dist/index.html');
});

app.get('/home', function(req,res){
    res.sendfile(__dirname + '/src/dist/index.html');
   }); 

app.get('/gettoken', function(req, res) {
    let uri = 'https://www.warcraftlogs.com/oauth/token'

    axios({
        method: 'post',
        url: uri,
        data: {
            'client_id': process.env.CLIENT_ID,
            'client_secret': process.env.CLIENT_SECRET,
            'grant_type': 'client_credentials'
        }
    })
    .then(function (response) {
        console.log('Obtained access token.')
        json = {
            'token': response.data.access_token
        }
        res.json(json)
    })
    .catch(function (error) {
        console.log(error)
    });
})

app.listen(process.env.PORT || 3001, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})