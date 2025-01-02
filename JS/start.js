
let animate2 = document.getElementById("animate2")
let levels = document.getElementById("levels");
let rules = document.getElementById("rules");
let animateEm = document.getElementById("animateEm");
let startswe = false;
const start = document.getElementById('start');
const animatedElements2 = document.querySelectorAll('.input, .contfortext span');
const animatedElements = document.querySelectorAll('.animate2, .text span, .text2 span, .rules, .input, .contfortext span, .animate');
const audioPlayer = document.getElementById('audioPlayer');
let input = document.getElementById("input");
let ctext = document.getElementById("ctext");
var nickname;
let amn = false;
let emnter = false;
const quest = document.getElementById("quest");
document.addEventListener("keydown", (event) => {
   if (event.key === "Enter" && emnter == false) { // IMPORTANT
      emnter = true;
      input.style.borderBottom = "none";
      ctext.style.opacity = "0";
      input.classList.add("textAnim");
      document.body.classList.add("bodys");
      nickname = input.value;
      localStorage.setItem('nickname', nickname);
      anm = true;
      document.body.addEventListener('animationend', (event) => {
         if (event.animationName === 'bodys') { // IMPORTANT
            audioPlayer.play();
            document.body.classList.remove("bodys");
            console.log("Animation was started");


            // Zapinani animace
            animatedElements.forEach(element => {
               element.style.animationPlayState = 'running';
            });
            startswe = true;

            start.style.display = "none";


            audioPlayer.muted = false;
            audioPlayer.volume = 0.3;
            
         }
      });
       
   }
});

let checker = false;
animate2.addEventListener('animationend', (event) => {
   console.log("animation easeh2 finished");
   if (event.animationName === 'easeh2') {
      checker = true;
      audioPlayer.pause();
      window.location.href = "mainmenu.html";
   }
   console.log(checker);
});

