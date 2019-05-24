//jshint node: true, esversion: 6
'use strict';

const express = require('express');
var cors = require('cors');
const app = express();

const port = 4000;
const externalApi = 'http://localhost:3000';

const logger = require('morgan');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const httpServer = require('http').createServer(app);

const socketio = require('socket.io');
const io = socketio.listen(httpServer);

const db = require('./lib/db');

db.defaults({
    judges: [],
    horses: [],
    classes: [],
}).write();

const judgeRoute = require('./routes/judge');
const horseRoute = require('./routes/horse');
const classRoute = require('./routes/class');
app.use('/judge', judgeRoute);
app.use('/horse', horseRoute);
app.use('/class', classRoute);

const axios = require('axios');
app.route('/import').get((_req, response) => {
    let finished = 0;
    const requests = 3;
    axios.get(`${externalApi}/sedziowie`).then((res) => {
        db.set('judges', res.data).write();
        finished++;
        if (finished === requests) {
            response.json('imported');
        }
    }, () => {
        response.status(500).json('NOK');
    });
    axios.get(`${externalApi}/konie`).then((res) => {
        db.set('horses', res.data).write();
        finished++;
        if (finished === requests) {
            response.json('imported');
        }
    }, () => {
        response.status(500).json('NOK');
    });
    axios.get(`${externalApi}/klasy`).then((res) => {
        db.set('classes', res.data).write();
        finished++;
        if (finished === requests) {
            response.json('imported');
        }
    }, () => {
        response.status(500).json('NOK');
    });
});

app.listen(port, () => {
    console.log('serwer uruchomiony na porcie: ' + port);
});
