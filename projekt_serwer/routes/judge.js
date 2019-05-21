const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.route('/').get((_r, res) => {
    const judges = db.get('judges').value();
    res.json(judges);
});

module.exports = router;
