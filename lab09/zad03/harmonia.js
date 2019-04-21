/* jshint esversion: 6, browser: true */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
   const headers = document.querySelectorAll('.hd');
   headers.forEach(el => {
      el.style.cursor = 'pointer';
      el.currentVisibility = '';
      const content = el.nextElementSibling;
      el.addEventListener('click', (ev) => {
         const visibility = el.currentVisibility === 'none' ? '' : 'none';
         el.currentVisibility = visibility;
         content.style.display = visibility;
      });
      el.addEventListener('mouseenter', (ev) => {
         content.style.display = '';
      });
      el.addEventListener('mouseleave', (ev) => {
         content.style.display = el.currentVisibility;
      });
   });
});
