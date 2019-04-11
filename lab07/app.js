//jshint node: true, esversion: 6
'use strict';

const express = require('express');
const app = express();

const port = 3000;

const logger = require('morgan');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const routes = require('./routes/game');
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));


app.use('/game', routes);

app.listen(port, () => {
    console.log('serwer uruchomiony');
});
