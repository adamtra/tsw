const express = require('express');
const router = express.Router();
const db = require('../lib/db');
const schemas = require('../lib/schemas');
const Validator = require('jsonschema').Validator;

router.route('/').get((_r, res) => {
    const judges = db.get('judges').value();
    res.json(judges);
});

router.route('/').post((req, res) => {
    const v = new Validator();
    const validation = v.validate(req.body, schemas.judge).errors.length === 0;
    if (validation) {
        res.json('OK');
    } else {
        res.status(400).json('Złe dane');
    }
});

module.exports = router;
