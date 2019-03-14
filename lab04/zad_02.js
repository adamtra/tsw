/* jshint strict: global, esversion: 6, devel: true */
'use strict';

String.prototype.nbsp = function () {
    const letters = ['a', 'i', 'o', 'u', 'w', 'z'];
    let output = this;
    letters.forEach((v) => {
        const reg = new RegExp('\\s' + v + '\\s', 'g');
        output = output.replace(reg, ' ' + v + '&nbsp;');
    });

    return output;
};

let tekst = 'Ala i As poszli w las';
console.log(tekst.nbsp());
