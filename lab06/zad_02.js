/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const razem = (fun1, fun2, cb) => {
    let result = [];
    const length = 2;
    fun1(5, (x) => {
        result.push(x);
        if(result.length === length) {
            cb(result);
        }
    });
    fun2(6, (x) => {
        result.push(x);
        if(result.length === length) {
            cb(result);
        }
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
    console.log(wynik);
};

razem(f1, f2, result);
