/* jshint esversion: 6, browser: true */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
   const headers = document.querySelectorAll('.hd');
   headers.forEach(el => {
      el.style.cursor = 'pointer';
      el.currentVisibility = '';
      el.addEventListener('click', (ev) => {
         const header = ev.target;
         const content = header.nextElementSibling;
         const visibility = header.currentVisibility === 'none' ? '' : 'none';
         header.currentVisibility = visibility;
         content.style.display = visibility;
      });
      el.addEventListener('mouseenter', (ev) => {
         const header = ev.target;
         const content = header.nextElementSibling;
         content.style.display = '';
      });
      el.addEventListener('mouseleave', (ev) => {
         const header = ev.target;
         const content = header.nextElementSibling;
         content.style.display = header.currentVisibility;
      });
   });
});
