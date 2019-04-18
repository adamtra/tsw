/* jshint esversion: 6, browser: true */
'use strict';

const checkHowDeep = (element) => {
    let maxSize = 0;
    const howDeep = (element, current) => {
        let children = Array.from(element.childNodes);
        if (children.length > 0) {
            children = children.filter(el => el.textContent.trim() !== "");
            children.forEach(el => {
                howDeep(el, current + 1);
            });
        } else {
            if (maxSize < current) {
                maxSize = current;
            }
        }
    };
    howDeep(element, 0);
    alert(`Głębokość drzewa: ${maxSize}`);
};
