/* jshint esversion: 6, browser: true */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
   const headers = document.querySelectorAll('.hd');
   headers.forEach(el => {
      el.style.cursor = 'pointer';
      const content = el.nextElementSibling;
      el.addEventListener('click', (ev) => {
         content.style.display = content.style.display === 'none' ? '' : 'none';
      });
   });
});
