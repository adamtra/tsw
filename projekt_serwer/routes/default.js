const express = require('express');
const router = express.Router();
router.route('*').get((_req, res) => {
    return res.status(501).json();
});
router.route('*').post((_req, res) => {
    return res.status(501).json();
});
router.route('*').put((_req, res) => {
    return res.status(501).json();
});
router.route('*').delete((_req, res) => {
    return res.status(501).json();
});

module.exports = router;
