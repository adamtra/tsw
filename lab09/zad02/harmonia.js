/* jshint esversion: 6, browser: true */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
   const headers = document.querySelectorAll('.hd');
   headers.forEach(el => {
      el.addEventListener('click', (ev) => {
         const header = ev.target;
      });
   });
});
