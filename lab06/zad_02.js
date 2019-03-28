/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const razem = (fun1, fun2, cb) => {
    let result = [];
    fun1(5, (x) => {
        result.push(x);
        cb(result);
    });
    fun2(6, (x) => {
        result.push(x);
        cb(result);
    });
};

const f1 = (x, cb) => {
    setTimeout(() => {
        return cb(x);
    }, Math.random() * 1000);
};

const f2 = (x, cb) => {
    setTimeout(() => {
        return cb(2 * (x + 3));
    }, Math.random() * 1000);
};

const result = (wynik) => {
    if (wynik.length === 2) {
        console.log(wynik);
    }
};

razem(f1, f2, result);
