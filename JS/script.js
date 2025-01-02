document.addEventListener('DOMContentLoaded', () => {
   // Dropdown logic
   const dropdownHeaders = document.querySelectorAll('.dropdown-header');

   dropdownHeaders.forEach(header => {
      header.addEventListener('click', () => {
         const parentDropdown = header.closest('.dropdown'); // PArent dropdown
         const content = parentDropdown.querySelector('.dropdown-content'); // content menu

         if (header.classList.contains('active')) {
            header.classList.remove('active');
            content.classList.remove('active');
         } else {
            document.querySelectorAll('.dropdown-header.active').forEach(activeHeader => {
               activeHeader.classList.remove('active');
               activeHeader.closest('.dropdown').querySelector('.dropdown-content').classList.remove('active');
            });

            header.classList.add('active');
            content.classList.add('active');
         }
      });
   });
});
let ember = document.getElementById("ember");
let animate2 = document.getElementById("animate2")
let levels = document.getElementById("levels");
let rules = document.getElementById("rules");
let animateEm = document.getElementById("animateEm");
let startswe = false;
levels.addEventListener("click", function () {
   console.log("Levels"); 
   ember.classList.add("levels"); 
   rules.classList.add("levels");  
   window.location.href = "mainmenu.html"; 
});
const start = document.getElementById('start');

const audioPlayer = document.getElementById('audioPlayer');
let input = document.getElementById("input");
let ctext = document.getElementById("ctext");
var nickname;
let amn = false;
let emnter = false;
const quest = document.getElementById("quest");
const question = document.getElementById("question");



let checker = true;
