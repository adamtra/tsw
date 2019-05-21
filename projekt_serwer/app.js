//jshint node: true, esversion: 6
'use strict';

const express = require('express');
const app = express();

const port = 4000;

const logger = require('morgan');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');

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

app.listen(port, () => {
    console.log('serwer uruchomiony na porcie: ' + port);
});
