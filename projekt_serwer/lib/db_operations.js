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
        const horses = db.get('horses').filter({
            klasa: classEl.id,
        }).value();
        let add = false;
        for (let i = 0; i < horses.length; i++) {
            if (horses[i].wynik.oceniono) {
                add = true;
                break;
            }
        }
        element.horses = horses;
        if (add) {
            response.push(element);
        }
    });
    return response;
};
const getEmptyScore = (judges) => {
    const score = [];
    const emptyScore = {
        typ: 0,
        glowa: 0,
        kloda: 0,
        nogi: 0,
        ruch: 0
    };
    judges.forEach(() => {
        score.push(emptyScore);
    });
    return score;
};
const changeHorseNumbers = (horseData) => {
    const sameNumber = db.get('horses').filter(horse => horseData.numer <= horse.numer).orderBy('numer', 'asc').value();
    let currentHighest = horseData.numer;
    for (let i = 0; i < sameNumber.length; i++) {
        if (sameNumber[i].numer - currentHighest > 0) {
            break;
        }
        sameNumber[i].numer++;
        currentHighest = sameNumber[i].numer;
    }
};
module.exports = {
    getId: getId,
    getAllResults: getAllResults,
    getEmptyScore: getEmptyScore,
    changeHorseNumbers: changeHorseNumbers,
};
