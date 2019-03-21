/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const fib = (arg)  => {
    if (arg <= 0) {
        return 0;
    }
    if (arg === 1) {
        return 1;
    }
    return fib(arg - 1) + fib(arg - 2);
};

const memo = (cache, fun) => {

    const addElement = () => {
        const result = fun((x) => {
            return cache[x];
        }, cache.length);
        cache.push(result);
    };

    return (n) => {
        if(n <= 0) {
            return 0;
        }
        for(let i = 1; i < n; i++) {
            addElement();
        }
        return cache[n];
    }
};

const fibonacci = memo([0, 1], (recur, n) => {
    return recur(n - 1) + recur(n - 2);
});

console.time('fib');
console.log(fib(30));
console.timeEnd('fib');
console.time('fibonacci');
console.log(fibonacci(30));
console.timeEnd('fibonacci');
