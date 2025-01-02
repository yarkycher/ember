document.addEventListener("DOMContentLoaded", () => {
   let ratings = {
      code: 0,
      emotions: 0,
      textures: 0,
      gameplay: 0
   };

   const stars = document.querySelectorAll('.star');
   const submitButton = document.getElementById('submitFeedback');

   // Обработчик событий для выбора звездочек
   stars.forEach(star => {
      star.addEventListener('click', (e) => {
         const value = parseInt(e.target.getAttribute('data-value'));
         const ratingContainer = e.target.closest('.rating');
         const labelText = ratingContainer.querySelector('label').textContent.trim();

         console.log('Clicked on star:', value, 'in category:', labelText);

         // Сохраняем выбранную оценку
         if (labelText === "Rate coding:") {
            ratings.code = value;
         } else if (labelText === "Rate emotions:") {
            ratings.emotions = value;
         } else if (labelText === "Rate textures:") {
            ratings.textures = value;
         } else if (labelText === "Rate gameplay:") {
            ratings.gameplay = value;
         }

         updateStars(ratingContainer, value);
      });
   });

   // Функция для обновления звездочек
   function updateStars(ratingContainer, value) {
      const starsInContainer = ratingContainer.querySelectorAll('.star');
      starsInContainer.forEach(star => {
         if (parseInt(star.getAttribute('data-value')) <= value) {
            star.classList.add('selected');
         } else {
            star.classList.remove('selected');
         }
      });
   }

   // Обработчик отправки отзыва
   submitButton.addEventListener('click', (e) => {
      // Проверяем, что все категории оценены
      if (ratings.code === 0 || ratings.emotions === 0 || ratings.textures === 0 || ratings.gameplay === 0) {
         e.preventDefault();
         alert('Please rate all sections.');
         return;
      }

      // Заполняем скрытые поля перед отправкой формы
      document.getElementById('code_rating').value = ratings.code;
      document.getElementById('emotions_rating').value = ratings.emotions;
      document.getElementById('textures_rating').value = ratings.textures;
      document.getElementById('gameplay_rating').value = ratings.gameplay;
   });
});

let fuflk = document.getElementById("back");

fuflk.addEventListener("click", function() {
   window.location.href = "mainmenu.html";
});