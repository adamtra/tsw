const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const db_operations = require('../lib/db_operations');
const schemas = require('../lib/schemas');
const Validator = require('jsonschema').Validator;

router.route('/').get((_r, res) => {
    const judges = db.get('judges').value();
    res.json(judges);
});

router.route('/:id').get((req, res) => {
    const judge = db.get('judges').find({
        id: Number(req.params.id),
    }).value();
    if (judge) {
        res.json(judge);
    } else {
        res.status(404).json('Nie znaleziono');
    }
});

router.route('/').post((req, res) => {
    const v = new Validator();
    const validation = v.validate(req.body, schemas.judge).errors.length === 0;
    if (validation) {
        db.get('judges').push({
            id: db_operations.getId('judges'),
            sedzia: req.body.sedzia,
            kraj: req.body.kraj,
        }).write();
        res.json('OK');
    } else {
        res.status(400).json('Złe dane');
    }
});

router.route('/:id').put((req, res) => {
    const id = Number(req.params.id);
    const judge = db.get('judges').find({
        id: id,
    }).value();
    if (judge) {
        const v = new Validator();
        const validation = v.validate(req.body, schemas.judge).errors.length === 0;
        if (validation) {
            db.get('judges').find({
                id: id,
            }).assign(req.body).value();
            res.json('OK');
        } else {
            res.status(400).json('Złe dane');
        }
    } else {
        res.status(404).json('Nie znaleziono');
    }
});

router.route('/:id').delete((req, res) => {
    const id = Number(req.params.id);
    const judge = db.get('judges').find({
        id: id,
    }).value();
    if (judge) {
        db.get('judges').remove({
            id: id,
        }).write();
        res.json('OK');
    } else {
        res.status(404).json('Nie znaleziono');
    }
});

module.exports = router;
