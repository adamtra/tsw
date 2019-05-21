const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.route('/').get((_r, res) => {
    const classes = db.get('classes').value();
    res.json(classes);
});

module.exports = router;
