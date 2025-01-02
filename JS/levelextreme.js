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
let kooler = 100;
let shield_countV = 0;
const bot = document.getElementById("bot");
const shieldp = document.getElementById("shieldp");
const koolerV = document.getElementById("koolerV");

const block = {
   x: 200,
   y: 200,
   width: 150,
   height: 50,
   element: document.getElementById("block"),
   speed: 5,
};

const blocks = [
   { id: 'block3', x: 0, y: -50, width: 150, height: 50, speed: 3, direction: 'down' },
   { id: 'block4', x: 300, y: -50, width: 150, height: 50, speed: 3, direction: 'down' },
   { id: 'block8', x: 600, y: -50, width: 150, height: 50, speed: 3, direction: 'down' },
   { id: 'block10', x: 900, y: -50, width: 150, height: 50, speed: 3, direction: 'down' },
   { id: 'block13', x: 1200, y: -50, width: 150, height: 50, speed: 3, direction: 'down' },
   { id: 'block18', x: 150, y: 700, width: 150, height: 50, speed: 3, direction: 'up' },
   { id: 'block19', x: 450, y: 700, width: 150, height: 50, speed: 3, direction: 'up' },
   { id: 'block22', x: 750, y: 700, width: 150, height: 50, speed: 3, direction: 'up' },
   { id: 'block26', x: 1050, y: 700, width: 150, height: 50, speed: 3, direction: 'up' },
];

// damage
let bgb = 2;
// create block in DOM
blocks.forEach(block => {
   const div = document.createElement("div");
   div.id = block.id;
   div.className = "block";
   div.style.position = "absolute";
   div.style.left = `${block.x}px`;
   div.style.top = `${block.y}px`;
   div.style.width = `${block.width}px`;
   div.style.height = `${block.height}px`;
   div.style.backgroundColor = "red"; 
   game.appendChild(div);
   block.element = div;
});
let animationDuration = 3000;
const shield_count = document.getElementById("shield_count");
const tools = [
   { id: 'bot', x: 400, y: 70, width: 65, height: 80}
];
const coi = [
   { id: 'coin1', x: 410, y: 230, width: 30, height: 30, class: 'gold' },
   { id: 'coin2', x: 810, y: 230, width: 30, height: 30, class: 'silver' },
   { id: 'coin3', x: 410, y: 440, width: 30, height: 30, class: 'bronze' },
   { id: 'coin4', x: 810, y: 440, width: 30, height: 30, class: 'gold' }
];
const namerb = document.getElementById("namerb");
let kill = false;
function renderCoins(coi) {
   coi.forEach(coin => {
      const coinElement = document.createElement('div');
      coinElement.id = coin.id; 
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
let bulletV = 9999;
bullets.innerHTML = bulletV;
let gameRunning = true;
let playerX = 0;
let playerY = 300;
const playerWidth = 50;
const playerHeight = 65;
const widthPole = 1300;
const heightPole = 700;
const speed = 3; //player
const blockspeed = document.getElementById("blockspeed");
let poX = document.getElementById("poX");
let poY = document.getElementById("poY");

let hearts = 1;
let hits = 100;
const maxHits = 100;

let canTakeDamage = true;
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
const speederV = document.getElementById(`speederV`);
let speeder = 1;
const namer = document.getElementById("namer");
function deleteBot(tool) {

   const index = tools.findIndex(t => t.id === tool.id);
   if (index !== -1) {
      tools.splice(index, 1);  // remove from massive
   }


   const botElement = document.getElementById(tool.id);
   if (botElement) {
      botElement.remove();  // remove from dom
   }

   // logs
   console.log(`object bot: '${tool.id}' removed.`);
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
let isSpeedChanged = false;
let faze2 = false;
function updateBotPosition() {
   if (!gameRunning) return;

   tools.forEach(tool => {

      if (!isSpeedChanged && hits <= maxHits / 2 && faze2 == false) {
         tool.speed = 0;
         bot.classList.add("animbot");
         setTimeout(() => {
            hits = 75;
            tool.speed = speeder + 4;
            isSpeedChanged = true;
            faze2 = true;
            updateHealth();
            bgb = 1.5;
            speederV.innerHTML = Math.round(speeder * 100) / 100 + 4;
            koolerV.innerHTML = Math.round(kooler * 100) / 100 + "ms";
         }, 3000);
      }

      if (hits === 0) {
         deleteBot(tool);
         return;
      }

      // inicializace path 
      if (!tool.path || tool.pathIndex === undefined) {
         tool.path1 = [
            { x: 400, y: 200 }, 
            { x: 800, y: 200 },   
            { x: 800, y: 420 },  
            { x: 400, y: 420 },  
            { x: 0, y: 70 },  
            { x: 1200, y: 70 },
            { x: 1200, y: 570 }, 
            { x: 0, y: 570 },
         ];

         tool.path2 = [
            { x: 500, y: 100 },
            { x: 800, y: 100 },
            { x: 800, y: 300 },
            { x: 500, y: 300 },
            { x: 500, y: 450 },
            { x: 800, y: 450 },
            { x: 800, y: 600 },
            { x: 500, y: 600 },
         ];
         
        
         tool.pathIndex = 0; // start dot of path
         tool.speed = speeder; // start speed bot
      }
      if (faze2) {
         tool.path = tool.path2; 
      } else {
         tool.path = tool.path1;
      }

      if (hits <= maxHits / 2 && tool.path !== tool.path2 && faze2 == true) {
         tool.path = tool.path2;
      }


      moveBotToTarget(tool);

      const botElement = document.getElementById(tool.id);
      if (botElement) {
         botElement.style.left = `${tool.x}px`;
         botElement.style.top = `${tool.y}px`;
      }

      tool.speed = speeder;
      namerb.style.top = `${tool.y - 20}px`;
      namerb.style.left = `${tool.x - 10}px`;
      namerb.innerHTML = "Ember";
   });


   requestAnimationFrame(updateBotPosition);
}

function startBotAnimation() {
   requestAnimationFrame(updateBotPosition);
}


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
function isColliding(player, block) {
   return (
      player.x < block.x + block.width &&
      player.x + player.width > block.x &&
      player.y < block.y + block.height &&
      player.y + player.height > block.y
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


let blockspeedV = 3;
function checkCollisionsWithCoins(playerRect, coins) {
   coins.forEach((coin, index) => {
      if (isColliding(playerRect, coin)) {
         console.log(`Player collided with ${coin.id}`);
         coins.splice(index, 1);  // delete coin
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
      spandww.forEach(element => { // vsechno co je inside spandww
         element.style.animationPlayState = 'running';
      });
      localStorage.setItem('level3', 3);
   }
};

let check = false;
let canMoveRight = false;
let canMoveLeft = false;
let canMoveUp = false;
let canMoveDown = false;
setInterval(canMove, 10);

function canMove(x, y) {

   const playerRect = { x: playerX + x, y: playerY + y, width: playerWidth, height: playerHeight };

   // // kolize
   // const blockCollision = blocks.some(block => isColliding(playerRect, block));
   // if (blockCollision && canTakeDamage && gameRunning) {
   //    console.log("collision");
   //    if (shield_countV > 0) {
   //       shield_countV -= 1;
   //       player.style.filter = 'hue-rotate(240deg)';
   //       shield_count.innerHTML = shield_countV;
   //    } else {
   //       canTakeDamage = false;
   //       hearts -= 1;
   //       canTakeDamage = true;
   //       console.log("Game over! health = " + hearts);
   //       game.style.display = "none";
   //       end.style.display = "block";
   //       gameRunning = false;
   //       spandw.forEach(element => {
   //          element.style.animationPlayState = 'running';
   //       });
   //       onTimerEnd();
   //       return true;
   //    }
   // }
   const collidedCoinIndex = coi.findIndex(coin => isColliding(playerRect, coin));
   if (collidedCoinIndex !== -1) {
      const collidedCoin = coi[collidedCoinIndex];
      console.log(`Player collided with ${collidedCoin.id}!`);

      // delete coin
      coi.splice(collidedCoinIndex, 1);

      // delete coin
      const coinElement = document.getElementById(collidedCoin.id);
      if (coinElement) {
         coinElement.remove();
      }

      
      coinsV++;
      coins.innerHTML = coinsV;
   }

   const toolCollision = tools.some(tool => isCollidingWithTool(playerRect, tool));

   

   // kolize + damage
   if (toolCollision && canTakeDamage && gameRunning) {
      setTimeout(function () {
         player.style.filter = 'none';
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
         player.style.filter = 'none';
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
      if (hearts <= 0 && gameRunning) {
         console.log("Game OVER! HEalth: " + hearts);
         game.style.display = "none";
         end.style.display = "block";
         gameRunning = false;
         spandw.forEach(element => {
            element.style.animationPlayState = 'running';
         });
         onTimerEnd();
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
         pauseTimer();
      } else {
         updateTimer();
         quest.style.display = "none";
         gameRunning = true;
         updateBotPosition();
         startTimer();
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
      namer.style.left = `${playerX - 16}px`;
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


pohyb();

const paintBlocks = [

];

let mis5 = document.getElementById("mis5");

let temirs = true;
let isAnimating = false;
function updateHealth() {
   const maxWidth = 600; // sirka healthbaru
   const red = (hits / maxHits) * 255;  // red
   const green = (1 - hits / maxHits) * 255;  // green

   healthBar.style.backgroundColor = `rgb(${Math.floor(green)}, ${Math.floor(red)}, 0)`;

   const healthPercentage = (hits / maxHits) * maxWidth;
   healthBar.style.width = `${healthPercentage}px`;
   healthBar.innerHTML = hits;
   if (hits == 0) {
      mis5.innerHTML = "star";
      mis5.style.color = "orange";
      kill = true;
      namerb.style.display = "none";
      bot.remove();     
      temirs = false;
      pauseTimer();
   }
}
setInterval(finish, 200);
function finish() {
   if (kill == true) {
      doors.style.display = "block";
      complete.classList.add("bottik");
      doorCollision = true;
   }
}




let shoot = false;
function createBullet(startX, startY, angle) {
   if (shoot == false) {
      shoot = true;
   
   if (bulletV <= 0) {
      console.log("Game OVER! HEalth = " + hearts);
      game.style.display = "none";
      end.style.display = "block";
      gameRunning = false;

      spandw.forEach(element => {
         element.style.animationPlayState = 'running';
      });
      onTimerEnd();
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
            console.log("+ " + 0.5 + "coins for hitting bot");
            coinsV += 1;
            if (hits > 0) {
               hits -= bgb;
               animationDuration -= 20;  
               console.log(animationDuration);
               kooler += 3;
               speeder += 0.025;
               tool.speed = speeder;
               updateHealth();
               blocks.forEach(block => {
                  block.speed += 0.05; 
                  blockspeedV = block.speed;
               });
               console.log(`New speed: ${blocks[0].speed}`);
               if (faze2) {
                  speeder += 0.025;
                  console.log("unbonus");
               }
            }

            console.log("Hits left: ", hits);

            // animace BOOM
            triggerExplosion(bulletRect.x, bulletRect.y);

            // animace gif pro bota
            if (!isAnimating && hits > 0) {
               isAnimating = true;
               const botElement = document.getElementById(tool.id);
               if (botElement) {
                  // bott.src = 'PHOTOBOSS/boss.ico'; // Hit
                  bot.style.filter = 'hue-rotate(180deg)';
                  setTimeout(() => {
                     bot.style.filter = 'none';
                     // bott.src = 'PHOTOBOSS/boss.ico'; // normal
                     isAnimating = false;
                  }, 200);
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
   moveBullet();
      setTimeout(() => {
         shoot = false;
      }, kooler); // cooldown na vystrel
   }
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








buy.style.display = "none";



function giving_shield_bosslvl() {
   shield_countV += 1;
   shield_count.innerHTML = shield_countV;
}
// giving_shield_bosslvl(); 
// calling this functioon, kdyz boss bude mit 50% HP and 25%


buy.addEventListener("click", function () {
   if (shield_countV == 0) {
      buy.style.display = "none";
      coinsV -= 20;
      shield_countV += 1;
      shield_bought = true;
      shield_count.innerHTML = shield_countV;
   }
   
});





setInterval(buyf, 100);

function buyf() {
   if (coinsV >= 20) {
      buy.style.display = "flex";
   }
   else {
      buy.style.display = "none";
   }
}

document.addEventListener("keydown", (event) => {
   if ((event.key === "e" || event.key === "E") && coinsV >= 20) {
      if (shield_countV == 0) {
      buy.style.display = "none";
      coinsV -= 20;
      shield_countV += 1;
      shield_count.innerHTML = shield_countV;
      shield_bought = true;
      }
   }
});

let timeRemaining = 3 * 60; // 3 minutes
let timerInterval;
let isPaused = false; // Track whether the timer is paused

// Function to update the timer
const updateTimer = () => {
   if (isPaused) {
      clearInterval(timerInterval); // Stop the interval when paused
      return;
   }

   const minutes = Math.floor(timeRemaining / 60);
   const seconds = timeRemaining % 60;

   console.log(`${minutes}:${seconds < 10 ? '0' + seconds : seconds}`);
   timer.innerHTML = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

   timeRemaining--;

   if (timeRemaining < 0) {
      clearInterval(timerInterval);
   }
};

// Function to start the timer (or resume if paused)
const startTimer = () => {
   if (isPaused) {
      // If the timer is paused, just resume it
      isPaused = false;
   }
   timerInterval = setInterval(updateTimer, 1000); // Start the interval
};

// Function to pause the timer
const pauseTimer = () => {
   isPaused = true; // Set paused state to true
   clearInterval(timerInterval); // Stop the interval
};

startTimer();













setInterval(bossStrike, animationDuration);




// bossAttack
function bossStrike() {
   if (gameRunning && kill == false) {


      let animationRunning = true;


      function moveBlocks() {
         let anyBlockMoving = false;

         blocks.forEach(block => {
            if (block.element) {

               if (block.direction === 'down') {
                  block.y += block.speed;
                  if (block.y >= 700) {
                     block.y = 750;
                     block.direction = 'up';
                     animationRunning = false;
                  }
               } else if (block.direction === 'up') {
                  block.y -= block.speed;
                  if (block.y <= -50) {
                     block.y = -100;
                     block.direction = 'down';
                     animationRunning = false;
                  }
               }


               block.element.style.top = `${block.y}px`;


               if ((block.direction === 'down' && block.y < 700) || (block.direction === 'up' && block.y > -50)) {
                  anyBlockMoving = true;
               }
            }
         });

         if (anyBlockMoving && animationRunning) {
            requestAnimationFrame(moveBlocks); 
         } else {

         }
      }


      moveBlocks();

   }
}


function update() {
   if (gameRunning) {
      checkCollisionWithDamage();

   }
   else if (gameRunning == false) {
      clearInterval(timerInterval);
   }
   speederV.innerHTML = Math.round(speeder * 100) / 100;
   koolerV.innerHTML = Math.round(kooler * 100) / 100 + "ms";
   blockspeed.innerHTML = Math.round(blockspeedV * 100) / 100 + "km/h";
   if (kill) {
      speederV.innerHTML = 0;
      koolerV.innerHTML = 0;
      blockspeed.innerHTML = 0;
   } 
}
setInterval(update, 100);

let damageCooldown = 1000;
function checkCollisionWithDamage() {

   const playerRect = { x: playerX, y: playerY, width: playerWidth, height: playerHeight };


   const blockCollision = blocks.some(block => isColliding(playerRect, block));

   if (blockCollision && canTakeDamage && gameRunning) {
      const currentTime = Date.now();

         console.log("Collision detected, taking damage");

         canTakeDamage = false; 

         console.log("collision3434");
         if (shield_countV > 0) {
            shield_countV -= 1;
            player.style.filter = 'hue-rotate(240deg)';
            console.log("shield");
            shield_count.innerHTML = shield_countV;
            setTimeout(() => {
               player.style.filter = 'hue-rotate(0deg)';
               console.log("shieldoff");
            }, 200);
            
         } else {
            canTakeDamage = false;
            hearts -= 1;
            canTakeDamage = true;
            console.log("Game over! health = " + hearts);
            game.style.display = "none";
            end.style.display = "block";
            gameRunning = false;
            spandw.forEach(element => {
               element.style.animationPlayState = 'running';
            });
            return true;
         }
         console.log(`Health: ${hearts}`);


         lastDamageTime = currentTime;



         setTimeout(() => {
            canTakeDamage = true;
         }, damageCooldown);


         if (hearts <= 0) {
            console.log("Game over! health = " + hearts);
            game.style.display = "none";
            end.style.display = "block";
            gameRunning = false;
            spandw.forEach(element => {
               element.style.animationPlayState = 'running';
            });
            onTimerEnd();
         }
      return true;
   }

   return false;
}






