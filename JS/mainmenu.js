function closeWindow() {
   if (confirm('Opravdu chcete odejit?(')) {
      window.close();
   }
}

var nickname;
let amn = false;
let emnter = false;
let startswe = false;
const quest = document.getElementById("quest");
document.addEventListener("keydown", (event) => {
   if (event.key === "Escape" || event.key === "p" || event.key === "P") {// IMPORTANT
      if (quest.style.display === "none" || quest.style.display === "") {// IMPORTANT
         quest.style.display = "flex";
      }
      else {
         if (startswe) { // IMPORTANT 
            console.log("Animation was started");
            quest.style.display = "none";
         }

         else { // IMPORTANT
            if (startswe == false) {
               console.log("Animation wasnt started");
            }
            quest.style.display = "none";
         }

      }
   }
});

let checker = true;
quest.addEventListener("click", () => {
   if (checker) {   //SUPER IMPORTANT
      quest.style.display = "none";
   }
   else if (startswe) { // IMPORTANT
      animatedElements.forEach(element => {
         element.style.animationPlayState = 'running';
         document.body.style.animationPlayState = 'running';
      });
      console.log(startswe);
      quest.style.display = "none";
   }
   else if (amn) { // IMPORTANT
      animatedElements2.forEach(element => {
         element.style.animationPlayState = 'running';
         document.body.style.animationPlayState = 'running';
      });
      quest.style.display = "none";
   }
   else { // IMPORTANT
      animatedElements.forEach(element => {
         element.style.animationPlayState = 'paused';
         document.body.style.animationPlayState = 'paused';

      });
      animatedElements2.forEach(element => {
         element.style.animationPlayState = 'running';
         document.body.style.animationPlayState = 'running';
      });

      input.style.animationPlayState = 'running';

      console.log(startswe);
      console.log("Closed by click")
      quest.style.display = "none";
   }
});
question.addEventListener("click", (event) => {
   event.stopPropagation(); // stop EVent
   console.log("Clicked on question");
});