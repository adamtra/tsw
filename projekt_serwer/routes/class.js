const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const connections = require('../lib/connection');
const db_operations = require('../lib/db_operations');
const schemas = require('../lib/schemas');
const Validator = require('jsonschema').Validator;
const isAuthenticated = require('../lib/authMiddleware');

router.route('/').get(isAuthenticated, (_r, res) => {
    const classes = db.get('classes').value();
    const response = [];
    classes.forEach(el => {
        const newEl = {};
        Object.assign(newEl, el);
        newEl.option = `${el.numer} - ${el.kat}`;
        response.push(newEl);
    });
    return res.json(response);
});

router.route('/opened').get(isAuthenticated, (_r, res) => {
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

router.route('/opened/champion').get(isAuthenticated, (_r, res) => {
    const classes = db.get('classes').filter({
        zamknieta: false,
        rozpoczeto: false,
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

router.route('/:id').get(isAuthenticated, (req, res) => {
    const classEl = db.get('classes').find({
        id: Number(req.params.id),
    }).value();
    if (classEl) {
        const response = {};
        Object.assign(response, classEl);
        if (classEl.hasOwnProperty('czempionat')) {
            response.horses = db.get('horses').filter({
                klasa: classEl.id,
            }).value();
        } else {
            response.horses = db.get('horses').filter({
                czempionat: {
                    id: classEl.id,
                },
            }).value();
        }
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

router.route('/').post(isAuthenticated,(req, res) => {
    const v = new Validator();
    const validation = v.validate(req.body, schemas.class).errors.length === 0;
    if (validation) {
        const newElement = {};
        Object.assign(newElement, req.body);
        newElement.id = db_operations.getId('classes');
        newElement.aktualizacja = (new Date()).getTime();
        db.get('classes').push(newElement).write();
        return res.json('OK');
    } else {
        return res.status(400).json('Złe dane');
    }
});

router.route('/:id').put(isAuthenticated, (req, res) => {
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
            if (req.body.hasOwnProperty('rozpoczeto')) {
                if (req.body.rozpoczeto !== classEl.rozpoczeto) {
                    const connectedClasses = db.get('classes').filter({
                        czempionat: classEl.id,
                        zamknieta: false,
                    }).value();
                    if (connectedClasses.length > 0) {
                        let response = 'Najpierw zamknij powiązane klasy:\n';
                        connectedClasses.forEach((el) => {
                           response += `${el.numer} - ${el.kat}\n`;
                        });
                        return res.status(400).json(response);
                    }
                }
            }
            delete req.body.horses;
            req.body.komisja.sort();
            Object.assign(classEl, req.body);
            classEl.aktualizacja = (new Date()).getTime();
            if (classEl.zamknieta) {
                if (classEl.hasOwnProperty('czempionat') && classEl.czempionat !== -1) {
                    db_operations.moveHorsesToChampionship(classEl);
                }
            }
            db.write();
            connections.io.emit('classes', db_operations.getAllClasses());
            return res.json('OK');
        } else {
            return res.status(400).json('Złe dane');
        }
    } else {
        return res.status(404).json('Nie znaleziono');
    }
});

router.route('/:id').delete(isAuthenticated, (req, res) => {
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
        db.get('horses').remove({
            klasa: id,
        }).write();
        connections.io.emit('classes', db_operations.getAllClasses());
        return res.json('OK');
    } else {
        return res.status(404).json('Nie znaleziono');
    }
});

connections.io.on('connection', socket => {
    let previousId;
    const changeRoom = (currentId) => {
        if (currentId !== previousId) {
            socket.leave(previousId);
            socket.join(currentId);
            previousId = currentId;
        }
    };

    socket.on('results', () => {
        socket.emit('classes', db_operations.getAllClasses());
    });
    socket.on('change-class', (id) => {
        changeRoom(id);
        socket.emit('scores', db_operations.getClassResults(id));
    });
});

module.exports = router;
