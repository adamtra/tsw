const express = require('express');
const router = express.Router();
const db = require('../lib/db');
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
            return response.json('imported');
        }
    }, () => {
        return response.status(500).json('NOK');
    });
    axios.get(`${externalApi}/konie`).then((res) => {
        db.set('horses', res.data).write();
        finished++;
        if (finished === requests) {
            return response.json('imported');
        }
    }, () => {
        return response.status(500).json('NOK');
    });
    axios.get(`${externalApi}/klasy`).then((res) => {
        db.set('classes', res.data).write();
        finished++;
        if (finished === requests) {
            return response.json('imported');
        }
    }, () => {
        return response.status(500).json('NOK');
    });
});

module.exports = router;
