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
        let horses;
        let add = false;
        if (classEl.hasOwnProperty('czempionat')) {
            horses = db.get('horses').filter({
                klasa: classEl.id,
            }).value();
            for (let i = 0; i < horses.length; i++) {
                if (horses[i].wynik.oceniono) {
                    add = true;
                    break;
                }
            }
        } else {
            horses = db.get('horses').filter({
                czempionat: {
                    id: classEl.id,
                },
            }).value();
            for (let i = 0; i < horses.length; i++) {
                if (horses[i].czempionat.wyniki.zloto.length > 0 ||
                    horses[i].czempionat.wyniki.srebro.length > 0 ||
                    horses[i].czempionat.wyniki.braz.length > 0) {
                    add = true;
                    break;
                }
            }
        }
        element.horses = horses;
        if (add) {
            response.push(element);
        }
    });
    return response;
};
const getEmptyScore = (id) => {
    const classEl = db.get('classes').find({
        id: id,
    }).value();
    const score = [];
    const emptyScore = {
        typ: 0,
        glowa: 0,
        kloda: 0,
        nogi: 0,
        ruch: 0
    };
    classEl.komisja.forEach(() => {
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
const moveHorsesToChampionship = (classEl) => {
    const dbHorses = db.get('horses').filter(horse => horse.klasa === classEl.id).value();
    const horses = JSON.parse(JSON.stringify(dbHorses));
    horses.forEach((horse) => {
        let score = 0;
        let typSum = 0;
        let ruchSum = 0;
        horse.wynik.noty.forEach((wynik) => {
            score += wynik.typ;
            score += wynik.glowa;
            score += wynik.kloda;
            score += wynik.nogi;
            score += wynik.ruch;
            typSum += wynik.typ;
            ruchSum += wynik.ruch;
        });
        horse.wynik.suma = score;
        horse.wynik.typSuma = typSum;
        horse.wynik.ruchSuma = ruchSum;
    });
    horses.sort((x, y) => {
        if (x.wynik.suma < y.wynik.suma) {
            return 1;
        } else if (x.wynik.suma > y.wynik.suma) {
            return -1;
        } else {
            if (x.wynik.typSuma < y.wynik.typSuma) {
                return 1;
            } else if (x.wynik.typSuma > y.wynik.typSuma) {
                return -1;
            } else {
                if (x.wynik.ruchSuma < y.wynik.ruchSuma) {
                    return 1;
                } else if (x.wynik.ruchSuma > y.wynik.ruchSuma) {
                    return -1;
                } else {
                    if (x.wynik.hasOwnProperty('rozjemca') && y.wynik.hasOwnProperty('rozjemca')) {
                        if (x.wynik.rozjemca < y.wynik.rozjemca) {
                            return -1;
                        } else if (x.wynik.rozjemca > y.wynik.rozjemca) {
                            return 1;
                        }
                    }
                }
            }
        }
        return 0;
    });
    for (let i = 0; i < 3; i++) {
        if (horses[i]) {
            const horseData = db.get('horses').find({
                id: horses[i].id,
            }).value();
            horseData.czempionat = {
                id: classEl.czempionat,
                wyniki: {
                    zloto: [],
                    srebro: [],
                    braz: [],
                },
            };
        }
    }
    db.write();
};
module.exports = {
    getId: getId,
    getAllResults: getAllResults,
    getEmptyScore: getEmptyScore,
    changeHorseNumbers: changeHorseNumbers,
    moveHorsesToChampionship: moveHorsesToChampionship,
};
