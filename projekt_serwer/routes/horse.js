const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const db_operations = require('../lib/db_operations');
const schemas = require('../lib/schemas');
const Validator = require('jsonschema').Validator;

router.route('/').get((_r, res) => {
    const horses = db.get('horses').value();
    res.json(horses);
});

router.route('/:id').get((req, res) => {
    const horse = db.get('horses').find({
        id: Number(req.params.id),
    }).value();
    if (horse) {
        res.json(horse);
    } else {
        res.status(404).json('Nie znaleziono');
    }
});

router.route('/').post((req, res) => {
    const v = new Validator();
    v.addSchema(schemas.detail, '/Detail');
    v.addSchema(schemas.note, '/Note');
    const validation = v.validate(req.body, schemas.horse).errors.length === 0;
    if (validation) {
        const newElement = {};
        Object.assign(newElement, req.body);
        newElement.id = db_operations.getId('horses');
        db.get('horses').push(newElement).write();
        res.json('OK');
    } else {
        res.status(400).json('Złe dane');
    }
});

router.route('/:id').put((req, res) => {
    const id = Number(req.params.id);
    const horse = db.get('horses').find({
        id: id,
    }).value();
    if (horse) {
        const v = new Validator();
        v.addSchema(schemas.detail, '/Detail');
        v.addSchema(schemas.note, '/Note');
        const validation = v.validate(req.body, schemas.horse).errors.length === 0;
        if (validation) {
            db.get('horses').find({
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
    const horse = db.get('horses').find({
        id: id,
    }).value();
    if (horse) {
        db.get('horses').remove({
            id: id,
        }).write();
        res.json('OK');
    } else {
        res.status(404).json('Nie znaleziono');
    }
});

module.exports = router;
