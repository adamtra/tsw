const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const db_operations = require('../lib/db_operations');
const schemas = require('../lib/schemas');
const Validator = require('jsonschema').Validator;
const isAuthenticated = require('../lib/authMiddleware');

router.use(isAuthenticated);

router.route('/').get((_r, res) => {
    const judges = db.get('judges').value();
    return res.json(judges);
});

router.route('/:id').get((req, res) => {
    const judge = db.get('judges').find({
        id: Number(req.params.id),
    }).value();
    if (judge) {
        return res.json(judge);
    } else {
        return res.status(404).json('Nie znaleziono');
    }
});

router.route('/').post((req, res) => {
    const v = new Validator();
    const validation = v.validate(req.body, schemas.judge).errors.length === 0;
    if (validation) {
        const newElement = {};
        Object.assign(newElement, req.body);
        newElement.id = db_operations.getId('judges');
        db.get('judges').push(newElement).write();
        return res.json('OK');
    } else {
        return res.status(400).json('Złe dane');
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
            Object.assign(judge, req.body);
            return res.json('OK');
        } else {
            return res.status(400).json('Złe dane');
        }
    } else {
        return res.status(404).json('Nie znaleziono');
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
        return res.json('OK');
    } else {
        return res.status(404).json('Nie znaleziono');
    }
});

module.exports = router;
