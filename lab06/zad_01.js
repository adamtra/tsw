/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const poKolei = (fun1, fun2, cb) => {
  fun1(6, (x) => {
     fun2(x, (y) => {
        cb(y);
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

const result = (x) => {
    console.log(`Odpowiedź: ${x}`);
};
poKolei(f1, f2, result);
