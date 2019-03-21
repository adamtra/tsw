/* jshint strict: global, esversion: 6, devel: true */
'use strict';

const toMap = (tab) => {
    const tabMap = new Map();
    tab.forEach((value, index) => {
        if(!tabMap.has(value)) {
            tabMap.set(value, new Set());
        }
        tabMap.get(value).add(index)
    });
    return tabMap;
};

const ocena = (kod)  => {
    const kodMap = toMap(kod);
    return (ruch) => {
        const ruchMap = toMap(ruch);
        let response = {
            biale: 0,
            czarne: 0
        };
        kodMap.forEach((kodValue, kodIndex) => {
           if(ruchMap.has(kodIndex)) {
               const set = ruchMap.get(kodIndex);
               set.forEach((ruchIndex) => {
                   if(kodValue.has(ruchIndex)) {
                       response.czarne++;
                       kodValue.delete(ruchIndex);
                       set.delete(ruchIndex);
                   }
               });
               response.biale += Math.min(kodValue.size, set.size);
           }
        });
        return response;
    }
};

const kod = [1,3,3,2,2];
const ruch = [2,2,3,9,2];
// const ruch = [1,2,2,3,2];
const f = ocena(kod);
console.log(f(ruch));
