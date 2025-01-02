let levels = document.getElementById("levels");
let photo2 = document.getElementById("photo2");
let text = document.getElementById("text");
let animateEm = document.getElementById("animateEm");
let nickname = localStorage.getItem('nickname');
function goToPage(url) {
   console.log("Levelsout animate on");
   console.log(url);
   window.location.href = url;
} 
const nexter = document.getElementById("nexter");
const backer = document.getElementById("backer");

nexter.addEventListener("click", () => {
   quest.style.display = "none";
   gameRunning = true;
});
backer.addEventListener("click", () => {
   quest.style.display = "none";
   gameRunning = true;
   window.location.href = "mainmenu.html";
});
let levelswin1 = localStorage.getItem('level1');
let levelswin2 = localStorage.getItem('level2');
let levelswin3 = localStorage.getItem('level3');

console.log(nickname);
const animatedElements = document.querySelectorAll('.animate, .animate2, .text span, .text2 span, .rules');
let startswe = true;
const quest = document.getElementById("quest");
setInterval(levelCheck, 100);
let level1 = document.getElementById("level1");
let level2 = document.getElementById("level2");
let level3 = document.getElementById("level3");
let win = 0;
function levelCheck() {
   switch (levelswin1) {
      case "1":
         level1.style.color = "green";
         win += 1;
         break;
   }
   switch (levelswin2) {
      case "2":
         level2.style.color = "green";
         win += 1;
         break;
   }
   switch (levelswin3) {
      case "3":
         level3.style.color = "green";
         win += 1;
         break;
   }

   if (win == 3) {
      // Чето сделать если тип выиграет
   }
};
document.addEventListener("keydown", (event) => {
   if (event.key === "Escape") {
      if (quest.style.display === "none" || quest.style.display === "") {
         quest.style.display = "flex";
         animatedElements.forEach(element => {
            element.style.animationPlayState = 'paused';
            audioPlayer.pause();
         });
         } else {
         if (startswe) {
            animatedElements.forEach(element => {
               element.style.animationPlayState = 'running';
               audioPlayer.play();
               console.log(startswe);
            });
         } else {
            animatedElements.forEach(element => {
               element.style.animationPlayState = 'paused';
               audioPlayer.pause();
               console.log(startswe);
            });
         }
         quest.style.display = "none";
         }
   }
});
quest.addEventListener("click", () => {
   quest.style.display = "none";
   });
question.addEventListener("click", (event) => {
   event.stopPropagation(); // stop Event
   console.log("Clicked on question");
});

