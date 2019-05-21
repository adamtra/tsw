//jshint node: true, esversion: 6
'use strict';

const express = require('express');
var cors = require('cors');
const app = express();

const port = 4000;

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
    if (db.get('judges').value().length === 0 && db.get('horses').value().length === 0 && db.get('classes').value().length === 0) {
        axios.get('http://localhost:3000/sedziowie').then((res) => {
            db.set('judges', res.data).write();
        });
        axios.get('http://localhost:3000/konie').then((res) => {
            db.set('horses', res.data).write();
        });
        axios.get('http://localhost:3000/klasy').then((res) => {
            db.set('classes', res.data).write();
        });
        response.json('imported');
    }
    response.status(400).json('Są już jakieś dane');
});

app.listen(port, () => {
    console.log('serwer uruchomiony na porcie: ' + port);
});
