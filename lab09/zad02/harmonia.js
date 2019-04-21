/* jshint esversion: 6, browser: true */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
   const headers = document.querySelectorAll('.hd');
   headers.forEach(el => {
      el.style.cursor = 'pointer';
      el.addEventListener('click', (ev) => {
         const header = ev.target;
         const content = header.nextElementSibling;
         content.style.display = content.style.display === 'none' ? '' : 'none';
      });
   });
});
