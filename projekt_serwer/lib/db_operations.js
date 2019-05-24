const db = require('./db');
const getId = (table) => {
    const last = db.get(table)
        .orderBy('id', 'desc')
        .take(1)
        .value();
    if (last) {
        return last[0].id + 1;
    }
    return 1;
};
module.exports = {
    getId: getId,
};
