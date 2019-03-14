/* jshint strict: global, esversion: 6, devel: true */
'use strict';

String.prototype.podstaw = function (dane) {
    let out = this;
    Object.keys(dane).forEach((key) => {
        out = out.replace(new RegExp('{' + key + '}', 'g'), dane[key]);
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
