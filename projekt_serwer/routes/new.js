const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const connections = require('../lib/connection');
const db_operations = require('../lib/db_operations');
const isAuthenticated = require('../lib/authMiddleware');

router.use(isAuthenticated);

router.route('/').get((_req, response) => {
    db.set('judges', []).write();
    db.set('classes', []).write();
    db.set('horses', []).write();
    connections.io.emit('scores', db_operations.getAllResults());
    return response.json('OK');
});

module.exports = router;
