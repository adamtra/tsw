/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const razemTab = (funTab, cb) => {
    let result = [];
    funTab.forEach((fun) => {
        fun(5, (x) => {
            result.push(x);
            if(funTab.length === result.length) {
                cb(result);
            }
        });
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

razemTab([f1, f2], result);
