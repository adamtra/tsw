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
    const classes = db.get('classes').value();
    return res.json(classes);
});

router.route('/opened').get((_r, res) => {
    const classes = db.get('classes').filter({
        zamknieta: false,
    }).value();
    const response = [];
    classes.forEach(el => {
        if (el.hasOwnProperty('czempionat')) {
            const newEl = {};
            Object.assign(newEl, el);
            newEl.option = `${el.numer} - ${el.kat}`;
            response.push(newEl);
        }
    });
    return res.json(response);
});

router.route('/opened/champion').get((_r, res) => {
    const classes = db.get('classes').filter({
        zamknieta: false,
    }).value();
    const response = [];
    classes.forEach(el => {
        if (!el.hasOwnProperty('czempionat')) {
            const newEl = {};
            Object.assign(newEl, el);
            newEl.option = `${el.numer} - ${el.kat}`;
            response.push(newEl);
        }
    });
    return res.json(response);
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
        return res.json(response);
    } else {
        return res.status(404).json('Nie znaleziono');
    }
});

router.route('/:id/horse/:hid').get((req, res) => {
    const id = Number(req.params.id);
    const classEl = db.get('classes').find({
        id: id,
    }).value();
    if (classEl.zamknieta) {
        return res.status(400).json('Klasa jest zamknięta');
    }
    const horse = db.get('horses').find({
       id: Number(req.params.hid),
       klasa: id,
    }).value();
    if (classEl && horse) {
        const response = {};
        Object.assign(response, classEl);
        response.komisja = [];
        classEl.komisja.forEach((el) => {
            const judge = db.get('judges').find({
                id: el,
            }).value();
            response.komisja.push(judge);
        });
        response.horse = horse;
        return res.json(response);
    } else {
        return res.status(404).json('Nie znaleziono');
    }
});

router.route('/').post((req, res) => {
    const v = new Validator();
    const validation = v.validate(req.body, schemas.class).errors.length === 0;
    if (validation) {
        const newElement = {};
        Object.assign(newElement, req.body);
        newElement.id = db_operations.getId('classes');
        db.get('classes').push(newElement).write();
        return res.json('OK');
    } else {
        return res.status(400).json('Złe dane');
    }
});

router.route('/:id').put((req, res) => {
    const id = Number(req.params.id);
    const classEl = db.get('classes').find({
        id: id,
    }).value();
    if (classEl) {
        if (classEl.zamknieta) {
            return res.status(400).json('Nie można edytować zamkniętej klasy');
        }
        const v = new Validator();
        const validation = v.validate(req.body, schemas.class).errors.length === 0;
        if (validation) {
            delete req.body.horses;
            req.body.komisja.sort();
            db.get('classes').find({
                id: id,
            }).assign(req.body).value();
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
    const classEl = db.get('classes').find({
        id: id,
    }).value();
    if (classEl) {
        if (classEl.zamknieta) {
            return res.status(400).json('Nie można usunąć zamkniętej klasy');
        }
        if (!classEl.hasOwnProperty('czempionat')) {
            const classes = db.get('classes').filter({
                czempionat: classEl.id,
            }).value();
            if (classes.length > 0) {
                return res.status(400).json('Nie można usunąć klasy czempionatowej z przypisanymi klasami');
            }
        }
        db.get('classes').remove({
            id: id,
        }).write();
        return res.json('OK');
    } else {
        return res.status(404).json('Nie znaleziono');
    }
});

connections.io.on('connection', socket => {
    socket.on('results', () => {
        socket.emit('scores', db_operations.getAllResults());
    });
});

module.exports = router;
