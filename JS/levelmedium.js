const player = document.getElementById("player");
const game = document.getElementById("game");
const fufel = document.getElementById("fufel");
const healthBar = document.getElementById("healthBar");
const heartsCount = document.getElementById("heartsCount");
const end = document.getElementById("end");
const complete = document.getElementById("complete");
const doors = document.getElementById("doors");
const spandww = document.querySelectorAll(".endw span");
const quest = document.getElementById("quest");
const question = document.getElementById("question");
const spandw = document.querySelectorAll(".end span");
let shield_countV = 0;

const shieldp = document.getElementById("shieldp");

// Параметры блока
const block = {
   x: 200,
   y: 200,
   width: 50,
   height: 50,
   element: document.getElementById("block"),
};
let shield_bought = false;

const shield_count = document.getElementById("shield_count");
const buy = document.getElementById("buy");
let surmis = 0;
const blocks = [
   { id: 'block1', x: 500, y: 220, width: 50, height: 50 },
   { id: 'block2', x: 550, y: 220, width: 50, height: 50 },
   { id: 'block3', x: 600, y: 220, width: 50, height: 50 },
   { id: 'block4', x: 650, y: 220, width: 50, height: 50 },
   { id: 'block5', x: 500, y: 501, width: 50, height: 50 },
   { id: 'block6', x: 550, y: 501, width: 50, height: 50 },
   { id: 'block7', x: 600, y: 501, width: 50, height: 50 },
   { id: 'block8', x: 650, y: 501, width: 50, height: 50 },
   { id: 'block9', x: 500, y: 360, width: 50, height: 50 },
   { id: 'block10', x: 550, y: 360, width: 50, height: 50 },
   { id: 'block11', x: 600, y: 360, width: 50, height: 50 },
   { id: 'block12', x: 650, y: 360, width: 50, height: 50 },
];

const tools = [
   { id: 'bot', x: 0, y: 0, width: 50, height: 75, speedX: 1, speedY: 1 }
];
const coi = [
   { id: 'coin1', x: 585, y: 170, width: 30, height: 30, class: 'gold' },
   { id: 'coin2', x: 585, y: 300, width: 30, height: 30, class: 'silver' },
   { id: 'coin3', x: 585, y: 440, width: 30, height: 30, class: 'bronze' },
   { id: 'coin4', x: 585, y: 580, width: 30, height: 30, class: 'gold' }
];
let kill = false;
function renderCoins(coi) {
   coi.forEach(coin => {
      const coinElement = document.createElement('div');
      coinElement.id = coin.id; // Присваиваем уникальный id монете
      coinElement.style.position = 'absolute';
      coinElement.style.left = `${coin.x}px`;
      coinElement.style.top = `${coin.y}px`;
      coinElement.style.width = `${coin.width}px`;
      coinElement.style.height = `${coin.height}px`;
      coinElement.style.borderRadius = '50%';
      coinElement.style.backgroundImage = "url('PHOTO/coin.png')";
      coinElement.style.backgroundSize = 'cover'; 
      coinElement.style.backgroundPosition = 'center'; 
      game.appendChild(coinElement);
   });
}
renderCoins(coi);
const coins = document.getElementById("coins_count");
let coinsV = 0;
const bullets = document.getElementById("bullet_count");
let bulletV = 27;
bullets.innerHTML = bulletV;
let botRect = { x: 0, y: 0, width: 50, height: 75 }; // hitbox pro bota
let healt;
let gameRunning = true;
let playerX = 0;
let playerY = 300;
const playerWidth = 50;
const playerHeight = 65;
const widthPole = 1300;
const heightPole = 700;
const speed = 3; //player

let poX = document.getElementById("poX");
let poY = document.getElementById("poY");

let hearts = 2;
let hits = 20;
const maxHits = 20;

let canTakeDamage = true; // flag pro kooldown HP
let doorCollision = false;

let nickname = localStorage.getItem('nickname');
console.log(nickname);
let nicknameb = true;

const keysPressed = {
   ArrowUp: false,
   ArrowDown: false,
   ArrowLeft: false,
   ArrowRight: false,
   w: false,
   a: false,
   s: false,
   d: false
};


const namer = document.getElementById("namer");
function resetBotPosition(tool) {
   tool.x = 0;
   tool.y = 0;

   const botElement = document.getElementById(tool.id);
   if (botElement) {
      botElement.style.left = `${tool.x}px`;
      botElement.style.top = `${tool.y}px`;
   }
}

function moveBotToTarget(tool) {
   const target = tool.path[tool.pathIndex];
   const dx = target.x - tool.x;
   const dy = target.y - tool.y;
   const distance = Math.sqrt(dx * dx + dy * dy);

   // check, jestli se dostal do cili
   if (distance < tool.speed) {
      tool.pathIndex = (tool.pathIndex + 1) % tool.path.length;
   } else {
      //pohyb k cili
      const step = tool.speed / distance; // delame normalni kroky pro bota
      tool.x += dx * step;
      tool.y += dy * step;
   }
}

function updateBotPosition() {
   if (!gameRunning) return;

   tools.forEach(tool => {
      // reset pozice botra jestli je mrtvy
      if (hits === 0) {
         resetBotPosition(tool);
         return;
      }

      // inicializace traektorie a rychlosti
      if (!tool.path || tool.pathIndex === undefined) {
         tool.path = [
            { x: 400, y: 70 },
            { x: 700, y: 70 },
            { x: 700, y: 270 },
            { x: 400, y: 270 },
            { x: 400, y: 420 },
            { x: 700, y: 420 },
            { x: 700, y: 570 },
            { x: 400, y: 570 },
         ];
         tool.pathIndex = 0; // pocatecni bod
         tool.speed = 4; // rychlost bota
      }

      // pohyb bota k cili
      moveBotToTarget(tool);

      // update pohyb bota na obrazovce
      const botElement = document.getElementById(tool.id);
      if (botElement) {
         botElement.style.left = `${tool.x}px`;
         botElement.style.top = `${tool.y}px`;
      }
      if (healthBar) {
         healthBar.style.top = `${tool.y - 20}px`;
         healthBar.style.left = `${tool.x}px`;
      }
   });

   // pokracujeme v animace
   requestAnimationFrame(updateBotPosition);
}

function startBotAnimation() {
   requestAnimationFrame(updateBotPosition);
}

// zpusteni animace
startBotAnimation();
player.style.height = playerHeight + "px";
player.style.width = playerWidth + "px";

// event llistener pro klavesnice
document.addEventListener("keydown", (event) => {
   if (event.key in keysPressed && gameRunning) {
      keysPressed[event.key] = true;
      poX.innerHTML = `x: ${playerX}; y: ${playerY}`;
   }
});

document.addEventListener("keyup", (event) => {
   if (event.key in keysPressed && gameRunning) {
      keysPressed[event.key] = false;
   }
});

// check jestli se dotkli, kolize
function isColliding(rect1, rect2) {
   return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.y + rect1.height > rect2.y
   );
}
// check jestli se dotkli, kolize
function isCollidingWithTool(player, tool) {
   return (
      player.x < tool.x + tool.width &&
      player.x + player.width > tool.x &&
      player.y < tool.y + tool.height &&
      player.y + player.height > tool.y
   );
}

function checkCollisions(player, coi) {
   coi.forEach((coin, index) => {
      if (isColliding(player, coin)) {
         console.log(`Player collided with ${coin.id}`);
         coi.splice(index, 1);
         console.log(`${coin.id} removed from the list.`);
      }
   });
}


const nexter = document.getElementById("nexter");
const backer = document.getElementById("backer");

nexter.addEventListener("click", () => {
   quest.style.display = "none";
   gameRunning = true;
   updateBotPosition();
});
backer.addEventListener("click", () => {
   quest.style.display = "none";
   gameRunning = true;
   updateBotPosition();
   window.location.href = "levels.html";
});
function isOutOfBounds(x, y) {
   return x < 0 || x > widthPole - playerWidth || y < 0 || y > heightPole - playerHeight;
}
// check jestli se dotkli, kolize
function isCollidingBullet(rect3, rect4) {
   return (
      rect3.x < rect4.x + rect4.width &&
      rect3.x + rect3.width > rect4.x &&
      rect3.y < rect4.y + rect4.height &&
      rect3.y + rect3.height > rect4.y
   );
}
setInterval(coinsf, 100);
function coinsf() {
   coins.innerHTML = coinsV;

};

setInterval(checkwin, 300);



function checkCollisionsWithCoins(playerRect, coins) {
   coins.forEach((coin, index) => {
      if (isColliding(playerRect, coin)) {
         console.log(`Player collided with ${coin.id}`);
         coins.splice(index, 1);  // Удаляем монету из массива
         console.log(`${coin.id} removed from the list.`);
      }
   });
}

function checkwin() {
   if (playerX > 1200 && playerY > 250 && playerY < 350 && doorCollision == true) {
      game.style.display = "none";
      endw.style.display = "block";
      gameRunning = false;
      console.log("WIN");
      spandww.forEach(element => { //vsechno co je nitri spandww
         element.style.animationPlayState = 'running';
      });
      localStorage.setItem('level2', 2);
   }
};

let check = false;
let canMoveRight = false;
let canMoveLeft = false;
let canMoveUp = false;
let canMoveDown = false;
function canMove(x, y) {

   const playerRect = { x: playerX + x, y: playerY + y, width: playerWidth, height: playerHeight };

   // kolize
   const blockCollision = blocks.some(block => isColliding(playerRect, block));

   // kolize
   
   const collidedCoinIndex = coi.findIndex(coin => isColliding(playerRect, coin));
   if (collidedCoinIndex !== -1) {
      const collidedCoin = coi[collidedCoinIndex];
      console.log(`Player collided with ${collidedCoin.id}!`);

      // Удаляем монету из массива
      coi.splice(collidedCoinIndex, 1);

      // Удаляем монету из DOM
      const coinElement = document.getElementById(collidedCoin.id);
      if (coinElement) {
         coinElement.remove();
      }

      // Обновляем счётчик монет
      coinsV++;
      coins.innerHTML = coinsV;

      collectCoin(collidedCoin.id);
   }

   const toolCollision = tools.some(tool => isCollidingWithTool(playerRect, tool));

   // kolize with bot
   if (blockCollision) {
      return false;
   }

   // kolize + damage
   if (toolCollision && canTakeDamage && gameRunning) {
      setTimeout(function () {
         player.style.filter = '';
      }, 500);
      if (shield_countV > 0) {
         shield_countV -= 1;
         player.style.filter = 'hue-rotate(240deg)';
         shield_count.innerHTML = shield_countV;
      } else {
         hearts -= 1;
         player.style.filter = 'brightness(0.2) invert(1)';
      }
      console.log("Hitting with bot, health: " + hearts);
      if (hearts <= 0) {
         console.log("Game over! health = " + hearts);
         game.style.display = "none";
         end.style.display = "block";
         gameRunning = false;
         spandw.forEach(element => {
            element.style.animationPlayState = 'running';
         });
      }
      // kooldown pro HP
      canTakeDamage = false;
      setTimeout(() => {
         canTakeDamage = true;
      }, 1000);
   }

   // pohyb je povolen
   return true;
}
let checkCollisionInterval = 100;

// periodicke overeni kolize
function checkCollisionWithBots() {

   const playerRect = { x: playerX, y: playerY, width: playerWidth, height: playerHeight };

   // kolize s new position bota
   const toolCollision = tools.some(tool => isCollidingWithTool(playerRect, tool));

   if (toolCollision && canTakeDamage && gameRunning) {
      setTimeout(function () {
         player.style.filter = '';
      }, 500);
      if (shield_countV > 0) {
         shield_countV -= 1;
         player.style.filter = 'hue-rotate(240deg)';
         shield_count.innerHTML = shield_countV;
      } else {
         hearts -= 1;
         player.style.filter = 'brightness(0.2) invert(1)';
      }
      console.log("Hitting with bot, health: " + hearts);
      if (hearts <= 0) {
         console.log("Game OVER! HEalth: " + hearts);
         game.style.display = "none";
         end.style.display = "block";
         gameRunning = false;
         spandw.forEach(element => {
            element.style.animationPlayState = 'running';
         });
      }

      // kooldown
      canTakeDamage = false;
      setTimeout(() => {
         canTakeDamage = true;
      }, 1000);
   }
}

// periodicke overeni
setInterval(checkCollisionWithBots, checkCollisionInterval);

// funkce pro update polohy blocku
function updateBlockPosition() {
   blocks.forEach(block => {
      const blockElement = document.getElementById(block.id);
      blockElement.style.top = block.y + "px";
      blockElement.style.left = block.x + "px";
   });
}


// eventlisteners
document.addEventListener("keydown", (event) => {
   if (event.key in keysPressed && gameRunning) {
      keysPressed[event.key] = true;
   }
});

document.addEventListener("keyup", (event) => {
   if (event.key in keysPressed && gameRunning) {
      keysPressed[event.key] = false;
   }
});

document.addEventListener("keydown", (event) => {
   if (event.key === "Escape" || event.key === "p" || event.key === "P") {
      if (quest.style.display === "none" || quest.style.display === "") {
         quest.style.display = "flex";
         gameRunning = false;
      } else {
         quest.style.display = "none";
         gameRunning = true;
         updateBotPosition();
      }
   }
});
quest.addEventListener("click", () => {
   quest.style.display = "none";
   gameRunning = true;
   updateBotPosition();
});
question.addEventListener("click", (event) => {
   event.stopPropagation(); // stop Event
   console.log("Clicked on question");
});

// pohyb
function pohyb() {
   checkCollisions(player, coi);
   if (nicknameb) {
      namer.style.top = `${playerY - 25}px`;
      namer.style.left = `${playerX - 18}px`;
      namer.innerHTML = nickname;
   }
   if (shield_countV >= 1) {
      shieldp.style.display = "flex";
      shieldp.style.top = `${playerY - 8}px`;
      shieldp.style.left = `${playerX - 14}px`;
   } else {
      shieldp.style.display = "none";
      shieldp.style.top = `${playerY - 8}px`;
      shieldp.style.left = `${playerX - 14}px`;
   }
   heartsCount.innerHTML = hearts;
   if ((keysPressed['ArrowUp'] || keysPressed['w']) && canMove(0, -speed) && gameRunning) {
      if (!isOutOfBounds(playerX, playerY - speed)) {
         playerY -= speed;
      }
   }


   if ((keysPressed['ArrowDown'] || keysPressed['s']) && canMove(0, speed) && gameRunning) {
      if (!isOutOfBounds(playerX, playerY + speed)) {
         playerY += speed;
      }
   }


   if ((keysPressed['ArrowLeft'] || keysPressed['a']) && canMove(-speed, 0) && gameRunning) {
      if (!isOutOfBounds(playerX - speed, playerY)) {
         playerX -= speed;
         player.classList.remove("rightPlayer");
         player.classList.add("leftPlayer");
      }
   }


   if ((keysPressed['ArrowRight'] || keysPressed['d']) && canMove(speed, 0) && gameRunning) {
      if (!isOutOfBounds(playerX + speed, playerY)) {
         playerX += speed;
         player.classList.add("rightPlayer");
         player.classList.remove("leftPlayer");
      }
   }


   player.style.top = playerY + "px";
   player.style.left = playerX + "px";

   // zase malovani pohybu ppro smooth pohyb
   requestAnimationFrame(pohyb);
}
blocks.forEach(block => {
   const blockElement = document.getElementById(block.id);
   blockElement.style.top = block.y + "px";
   blockElement.style.left = block.x + "px";
});

pohyb();

const paintBlocks = [

];
let mis1 = document.getElementById("mis1");
let mis2 = document.getElementById("mis2");
let mis3 = document.getElementById("mis3");
let mis4 = document.getElementById("mis4");
let mis5 = document.getElementById("mis5");
const bot = document.getElementById("bot");

let isAnimating = false;
let botkik = false;
function updateHealth() {
   // pro healthBar bota
   const red = (hits / maxHits) * 255;  // red
   const green = (1 - hits / maxHits) * 255;  // green

   healthBar.style.backgroundColor = `rgb(${Math.floor(green)}, ${Math.floor(red)}, 0)`;

   const healthPercentage = (hits / maxHits) * 100;
   healthBar.style.width = `${healthPercentage}%`;

   if (hits == 0) {
      bot.style.display = "none";
      botkik = true;
      mis5.innerHTML = "star";
      mis5.style.color = "orange";
      kill = true;
      setTimeout(() => {
         bot.innerHTML = '<img src="PHOTO/target.png" width="50px">';
         isAnimating = false;
         bot.style.display = "block"; // Show bot again
         hits = 20;  // Reset health
         healthBar.style.backgroundColor = `rgb(${Math.floor(green)}, ${Math.floor(red)}, 0)`; // Reset health bar
      }, 1000);
   }
}
setInterval(finish, 200);
function finish() {
   if (kill == true && surmis == 4) {
      doors.style.display = "block";
      complete.classList.add("bottik");
      doorCollision = true;
   }
}



function collectCoin(coinId) {
   console.log("+1 coin for collecting a coin");

   switch (coinId) {
      case "coin1":
         mis1.innerHTML = "star";
         mis1.style.color = "orange";
         surmis += 1;
         break;
      case "coin2":
         mis2.innerHTML = "star";
         mis2.style.color = "orange";
         surmis += 1;
         break;
      case "coin3":
         mis3.innerHTML = "star";
         mis3.style.color = "orange";
         surmis += 1;
         break;
      case "coin4":
         mis4.innerHTML = "star";
         mis4.style.color = "orange";
         surmis += 1;
         break;
      default:
         console.log("Unknown coin id");
   }
}

function createBullet(startX, startY, angle) {

   if (bulletV <= 0) {
      console.log("Game OVER! HEalth = " + hearts);
      game.style.display = "none";
      end.style.display = "block";
      gameRunning = false;

      spandw.forEach(element => {
         element.style.animationPlayState = 'running';
      });
   }
   bulletV -= 1;
   bullets.innerHTML = bulletV;
   console.log("u have only " + bulletV + " bullets");

   const bullet = document.createElement('div'); // vytvarime div pro bullet
   bullet.classList.add('bullet'); // bullet class
   game.appendChild(bullet); // pridavame do game plochy

   const bulletSpeed = 10; // rychlost bulletu
   const bulletSize = 20; // vcelikost
   bullet.style.height = bulletSize + "px"; // vyska
   bullet.style.width = bulletSize + "px"; // sirka
   let bulletX = startX + playerWidth / 2 - bulletSize / 2; // x poloha
   let bulletY = startY + playerWidth / 2 - bulletSize / 2; // y poloha

   bullet.style.left = `${bulletX}px`; // x poloha
   bullet.style.top = `${bulletY}px`; // y poloha

   const angleRad = Math.atan2(angle.y - (startY + playerHeight / 2), angle.x - (startX + playerWidth / 2));
   const deltaX = Math.cos(angleRad) * bulletSpeed;
   const deltaY = Math.sin(angleRad) * bulletSpeed;
   // tohle slouzi pro to, abych bullet letel napr na 45 stupnu, nebo 54 atd

   let isBulletHit = false;

   function moveBullet() {
      if (gameRunning) {
         bulletX += deltaX;
         bulletY += deltaY;

         bullet.style.left = `${bulletX}px`;
         bullet.style.top = `${bulletY}px`;
      }


      const bulletRect = { x: bulletX, y: bulletY, width: bulletSize, height: bulletSize };

      //jestli bullet se dotknul do neceho, stop checking
      if (isBulletHit) return;

      // kolize bullet a blocku
      for (const block of blocks) {
         const blockElement = document.getElementById(block.id);
         const blockRect = { x: block.x, y: block.y, width: block.width, height: block.height };

         if (isColliding(bulletRect, blockRect)) {
            bullet.remove();
            isBulletHit = true;

            // animace BOOM
            triggerExplosion(bulletX, bulletY);


            blockElement.style.backgroundColor = "Red";

            // missions
            

            paintBlocks.sort();
            return; // jestli pbullet se dotknul do blocku, stop funkce
         }
      }

      // kolize bulletu a bota
      tools.forEach(tool => {
         const botRect = { x: tool.x, y: tool.y, width: tool.width, height: tool.height };

         // kolize bulletu a bota
         if (isColliding(bulletRect, botRect) && !isBulletHit) {
            bullet.remove();
            isBulletHit = true;
            console.log("+ " + 2 + "coins for hitting bot");
            coinsV += 2;
            if (hits > 0) {
               hits -= 1;
               updateHealth();
            }

            console.log("Hits left: ", hits);

            // animace BOOM
            triggerExplosion(bulletRect.x, bulletRect.y);

            // animace gif pro bota
            if (!isAnimating && hits > 0) {
               isAnimating = true;
               const botElement = document.getElementById(tool.id);
               if (botElement) {
                  botElement.innerHTML = '<img src="PHOTO/Target.gif" width="50px">'; // заменяем на GIF-анимированное изображение

                  setTimeout(() => {
                     botElement.innerHTML = '<img src="PHOTO/target.png" width="50px">'; // возвращаем исходное изображение
                     isAnimating = false;
                  }, 1200);
               }
            }
         }
      });

      // proste overflow
      if (bulletX < 0 || bulletX > widthPole || bulletY < 0 || bulletY > heightPole) {
         // zdrzeni
         setTimeout(() => {
            triggerExplosion(bulletX, bulletY);
            bullet.remove();
         }, 100);
      } else {
         requestAnimationFrame(moveBullet); // smooth pohyb bulletu
      }

   }
   moveBullet(); // pohyb bulletu
}

// boom bullet
function triggerExplosion(x, y) {
   const explosion = document.createElement('div'); // div pro BOOM
   explosion.classList.add('explosion'); // pridavame class pro BOOM
   explosion.style.left = `${x - 25}px`; // presouvani pro presnost
   explosion.style.top = `${y - 25}px`;
   game.appendChild(explosion);

   // mazeme div a BOOM po ukonceni animace
   setTimeout(() => {
      explosion.remove();
   }, 500);
}

// kouka kde jsem kliknul a urcuje cemu se rovna roh mezi player a ckickem
game.addEventListener('click', (event) => {
   const mouseX = event.clientX - game.getBoundingClientRect().left;
   const mouseY = event.clientY - game.getBoundingClientRect().top;
   const angle = { x: mouseX, y: mouseY };
   createBullet(playerX, playerY, angle);
   //metoda pro create bullet
});


buy.addEventListener("click", function () {
   if (shield_bought == false && shield_countV == 0) {
      buy.style.display = "none";
      coinsV -= 20;
      shield_countV += 1;
      shield_count.innerHTML = shield_countV;
   }
});





setInterval(buyf, 100);

function buyf() {
   if (coinsV >= 20 && shield_bought == false) {
      buy.style.display = "flex";
   }
   else {
      buy.style.display = "none";
   }
}
console.log("Обработчик событий подключен!");
document.addEventListener("keydown", (event) => {
   if (shield_bought == false && shield_countV == 0) {
      if ((event.key === "e" || event.key === "E") && coinsV >= 20) {
         buy.style.display = "none";
         coinsV -= 20;
         shield_countV += 1;
         shield_count.innerHTML = shield_countV;
      }
   }
});