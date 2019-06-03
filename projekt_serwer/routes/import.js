const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const connections = require('../lib/connection');
const db_operations = require('../lib/db_operations');
const axios = require('axios');
const externalApi = 'http://localhost:3000';
const isAuthenticated = require('../lib/authMiddleware');

router.use(isAuthenticated);

router.route('/').get((_req, response) => {
    let finished = 0;
    const requests = 3;
    axios.get(`${externalApi}/sedziowie`).then((res) => {
        db.set('judges', res.data).write();
        finished++;
        if (finished === requests) {
            connections.io.emit('scores', db_operations.getAllResults());
            return response.json('imported');
        }
    }, () => {
        return response.status(500).json('NOK');
    });
    axios.get(`${externalApi}/konie`).then((res) => {
        db.set('horses', res.data).write();
        finished++;
        if (finished === requests) {
            connections.io.emit('scores', db_operations.getAllResults());
            return response.json('imported');
        }
    }, () => {
        return response.status(500).json('NOK');
    });
    axios.get(`${externalApi}/klasy`).then((res) => {
        const classes = res.data;
        classes.forEach((classEl) => {
           classEl.komisja.sort();
        });
        db.set('classes', classes).write();
        finished++;
        if (finished === requests) {
            connections.io.emit('scores', db_operations.getAllResults());
            return response.json('imported');
        }
    }, () => {
        return response.status(500).json('NOK');
    });
});

module.exports = router;
