require('./../config/config');

var express = require('express');
const port = process.env.PORT;

const path = require('path'); //built in

const publicPath = path.join(__dirname, '../public');
const serverPath = path.join(__dirname, '../server');

var app = express();

app.use(express.static(publicPath));
//routes

app.listen(port, () => {
    console.log(`server started on ${port}`);
});