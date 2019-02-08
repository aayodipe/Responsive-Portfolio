const progressBar = require('progressbar.js')
window.onload = function onLoad() {
let line = new ProgressBar.Line('#container', {
         color: '#FCB03C',
         duration: 3000,
         easing: 'easeInOut'
     });
 
     line.animate(1);
 };