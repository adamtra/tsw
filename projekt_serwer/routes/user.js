const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const schemas = require('../lib/schemas');
const Validator = require('jsonschema').Validator;
const isAuthenticated = require('../lib/authMiddleware');

router.route('/check').get(isAuthenticated, (req, res) => {
    return res.json('OK');
});

router.route('/login').post((req, res) => {
    const v = new Validator();
    const validation = v.validate(req.body, schemas.user).errors.length === 0;
    if (validation) {
        if (req.body.email === 'admin@horse.com' && req.body.password === 'admin1234') {
            const token = generateToken(40);
            const expiration = new Date();
            expiration.setTime(expiration.getTime() + 15 * 6e4);
            db.get('tokens').push({
                value: token,
                expiration: expiration.getTime(),
            }).write();
            return res.json(token);
        }
        return res.status(401).json('Zły login lub hasło');
    } else {
        return res.status(400).json('Złe dane');
    }
});

router.route('/logout').post(isAuthenticated, (req, res) => {
    db.get('tokens').remove({
        value: req.token,
    }).write();
    return res.json('OK');
});

const generateToken = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};

module.exports = router;

