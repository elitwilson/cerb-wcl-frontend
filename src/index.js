const express = require('express')
const path = require('path')
const app = express()
require('dotenv').config()
console.log(process.env)

app.use(express.static('src/dist'));


app.get('/home', function(req,res){
    res.sendfile(__dirname + '/src/dist/index.html');
   }); 

app.listen(process.env.PORT || 3001, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})