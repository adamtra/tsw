//jshint node: true, esversion: 6
'use strict';

const connections = require('./lib/connection');

const cors = require('cors');
const app = connections.app;

const port = 4000;

const logger = require('morgan');
const errorHandler = require('errorhandler');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const db = require('./lib/db');

db.defaults({
    judges: [],
    horses: [],
    classes: [],
    tokens: [],
}).write();

const judgeRoute = require('./routes/judge');
const horseRoute = require('./routes/horse');
const classRoute = require('./routes/class');
const userRoute = require('./routes/user');
const importRoute = require('./routes/import');
const newRoute = require('./routes/new');
const defaultRoute = require('./routes/default');
app.use('/judge', judgeRoute);
app.use('/horse', horseRoute);
app.use('/class', classRoute);
app.use('/user', userRoute);
app.use('/import', importRoute);
app.use('/new', newRoute);
app.use(defaultRoute);

connections.httpServer.listen(port, () => {
    console.log('serwer uruchomiony na porcie: ' + port);
});
