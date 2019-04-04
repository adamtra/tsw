//jshint node: true, esversion: 6
'use strict';

const app = require('express')();
const port = 3000;

const logger = require('morgan');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const routes = require('./routes/game');


app.use('/game', routes);

app.listen(port, () => {
    console.log('serwer uruchomiony');
});
