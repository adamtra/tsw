/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const defFun = function(fun, types) {
    fun.typeConstr = types;
    return fun;
};

const appFun = function (f) {
    let args = Array.from(arguments);
    if (f.hasOwnProperty('typeConstr')) {
        f.typeConstr.forEach((v, i) => {
            if (typeof args[i + 1] !== v) {
                throw {
                    typerr: "Podano złe argumenty"
                }
            }
        });
        args = args.slice(1);
        return f.apply(this, args);
    } else {
        throw {
            typerr: "Nie parametru typeConstr"
        }
    }
};

const myfun = defFun((a, b) => a + b, ['number', 'number']);

try {
    console.log(appFun(myfun, 12, 15));
} catch (e) {
    console.log(e.typerr);
}
