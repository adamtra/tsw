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
        const response = {};
        Object.assign(response, classEl);
        response.horses = db.get('horses').filter({
            klasa: classEl.id,
        }).value();
        res.json(response);
    } else {
        res.status(404).json('Nie znaleziono');
    }
});

module.exports = router;
