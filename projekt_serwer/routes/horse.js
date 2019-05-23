const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.route('/').get((_r, res) => {
    const horses = db.get('horses').value();
    res.json(horses);
});

router.route('/:id').get((req, res) => {
    const horse = db.get('horses').find({
        id: Number(req.params.id),
    }).value();
    if (horse) {
        horse.klasaDetails = db.get('classes').find({
            id: horse.klasa,
        }).value();
        res.json(horse);
    } else {
        res.status(404).json('Nie znaleziono');
    }
});

module.exports = router;
