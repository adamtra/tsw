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
const getAllResults = () => {
    const classes = db.get('classes').orderBy('aktualizacja', 'desc').value();
    const response = [];
    classes.forEach((classEl) => {
        const element = {};
        Object.assign(element, classEl);
        element.horses = db.get('horses').filter({
            klasa: classEl.id,
        }).value();
        response.push(element);
    });
    return response;
};
module.exports = {
    getId: getId,
    getAllResults: getAllResults,
};
