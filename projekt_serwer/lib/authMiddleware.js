const db = require('../lib/db');
const isAuthenticated = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (authHeader) {
        let token = authHeader.split(' ');
        token = token[1];
        const tokenCheck = db.get('tokens').find({
            value: token,
        }).value();
        if (tokenCheck) {
            const now = new Date();
            if (now.getTime() < tokenCheck.expiration) {
                const newExpiration = new Date();
                newExpiration.setTime(newExpiration.getTime() + 15 * 6e4);
                db.get('tokens').find({
                    value: token,
                }).assign({
                    expiration: newExpiration.getTime(),
                }).value();
                db.write();
                req.token = token;
                return next();
            } else {
                db.get('tokens').remove({
                    value: token,
                }).write();
            }
        }
    }
    res.status(403).json('Brak uprawnień');
};
module.exports = isAuthenticated;
