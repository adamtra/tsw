const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const connections = require('../lib/connection');
const db_operations = require('../lib/db_operations');
const schemas = require('../lib/schemas');
const Validator = require('jsonschema').Validator;
const isAuthenticated = require('../lib/authMiddleware');

router.use(isAuthenticated);

router.route('/').get((_r, res) => {
    const horses = db.get('horses').value();
    return res.json(horses);
});

router.route('/:id').get((req, res) => {
    const horse = db.get('horses').find({
        id: Number(req.params.id),
    }).value();
    if (horse) {
        return res.json(horse);
    } else {
        return res.status(404).json('Nie znaleziono');
    }
});

router.route('/').post((req, res) => {
    const v = new Validator();
    v.addSchema(schemas.detail, '/Detail');
    v.addSchema(schemas.note, '/Note');
    const validation = v.validate(req.body, schemas.horse).errors.length === 0;
    if (validation) {
        const score = db_operations.getEmptyScore(req.body.klasa);
        const newElement = {};
        Object.assign(newElement, req.body);
        newElement.wynik = {
            oceniono: false,
            noty: score,
        };
        db_operations.changeHorseNumbers(req.body);
        newElement.id = db_operations.getId('horses');
        db.get('horses').push(newElement).write();
        return res.json('OK');
    } else {
        return res.status(400).json('Złe dane');
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
            if (req.body.hasOwnProperty('czempionat')) {
                delete req.body.czempionat.suma;
            }
            if (horse.klasa !== req.body.klasa) {
                if (horse.oceniono) {
                    return res.status(400).json('Nie można zmienić klasy ocenionego konia');
                } else {
                    req.body.wynik.noty = db_operations.getEmptyScore(req.body.klasa);
                }
            }
            if (horse.numer !== req.body.numer) {
                db_operations.changeHorseNumbers(req.body);
            }
            Object.assign(horse, req.body);
            const classEl = db.get('classes').find({
                id: horse.klasa,
            }).value();
            if (horse.hasOwnProperty('czempionat')) {
                const classChampionship = db.get('classes').find({
                    id: horse.czempionat.id,
                }).value();
                classChampionship.aktualizacja = (new Date()).getTime();
            } else {
                classEl.aktualizacja = (new Date()).getTime();
            }
            db.write();
            connections.io.emit('scores', db_operations.getAllResults());
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
    const horse = db.get('horses').find({
        id: id,
    }).value();
    if (horse) {
        if (horse.wynik.oceniono) {
            return res.status(400).json('Nie można usunąć ocenionego konia.');
        }
        db_operations.changeHorseNumbers(horse, 1);
        db.get('horses').remove({
            id: id,
        }).write();
        return res.json('OK');
    } else {
        return res.status(404).json('Nie znaleziono');
    }
});

module.exports = router;
