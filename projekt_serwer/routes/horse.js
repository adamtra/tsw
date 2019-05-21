const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.route('/').get((_r, res) => {
    const horses = db.get('horses').value();
    res.json(horses);
});

module.exports = router;
