/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const poKoleiTab = (funTab, cb) => {
    let last = 5;
    const next = (i) => {
      funTab[i](last, (val) => {
        last = val;
        if((funTab.length - 1) !== i) {
            next(i + 1);
        } else {
            cb(last);
        }
      });
    };
    next(0);
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

const result = (x) => {
    console.log(`Odpowiedź: ${x}`);
};
poKoleiTab([f1, f2, f2], result);
