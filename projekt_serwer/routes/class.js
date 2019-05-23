const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.route('/').get((_r, res) => {
    const classes = db.get('classes').value();
    res.json(classes);
});

router.route('/:id').get((req, res) => {
    const classEl = db.get('classes').find({
        id: Number(req.params.id),
    }).value();
    if (classEl) {
        res.json(classEl);
    } else {
        res.status(404).json('Nie znaleziono');
    }
});

module.exports = router;
