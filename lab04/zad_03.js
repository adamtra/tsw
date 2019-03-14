/* jshint strict: global, esversion: 6, devel: true */
'use strict';

String.prototype.podstaw = function (dane) {
    let out = this;
    Object.keys(dane).forEach((key) => {
        if(typeof dane[key] === 'string' || dane[key] === 'number') {
            const reg = new RegExp('{' + key + '}', 'g');
            out = out.replace(reg, dane[key]);
        }
    });
    return out;
};

let szablon =
    '<table border="{border}">' +
    '  <tr><td>{first}</td><td>{last}</td></tr>' +
    '</table>';

let dane = {
    first: "Jan",
    last:  "Kowalski",
    pesel: "97042176329"
};

console.log(szablon.podstaw(dane));
