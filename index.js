let lastPaintTime = 0;
let speed = 12;
let planeLocation = {
  x: 100,
  y: -10,
};
let bullets = [];
let aliens = [];
let killedArmy = 0;
let bulletsUsed = 0;
let bulletFired = 0;
let leftLimit = -21;
let rightLimit = -1;
let bulletDisappearLimit = 0;

createAliensArmy = () => {
  for (var x = 1; x <=5; x++) {
    for (var y = rightLimit; y > leftLimit +3; y--) {
      var alien = {
        x: x,
        y: y,
        killed: false,
      };
      aliens.push(alien);
    }
  }
};

createAlien = (board, alien) => {
  var htmlElement = document.createElement("div");
  htmlElement.style.gridRowStart = alien.x;
  htmlElement.style.gridColumnStart = alien.y;
  if (!alien.killed) {
    htmlElement.classList.add("alien");
  } else {
    htmlElement.classList.add("alienKilled");
  }
  board.appendChild(htmlElement);
};

getBoard = () => {
  let board = document.getElementById("gameboard");
  board.innerHTML = "";
  return board;
};

createPlane = (board) => {
  var htmlElement = document.createElement("div");
  htmlElement.style.gridRowStart = planeLocation.x;
  htmlElement.style.gridColumnStart = planeLocation.y;
  htmlElement.classList.add("plane");
  board.appendChild(htmlElement);
};

paintBullet = (board, bullet) => {
  var htmlElement = document.createElement("div");
  htmlElement.style.gridRowStart = bullet.x;
  htmlElement.style.gridColumnStart = bullet.y;
  htmlElement.classList.add("bullet");
  board.appendChild(htmlElement);
};

createBullet = () => {
  let bullet = {
    x: planeLocation.x - 78,
    y: planeLocation.y,
    used: false,
  };
  bulletFired++;
  bullets.push(bullet);
};

fire = (board) => {
  bullets = bullets.filter((bullet) => {
    if (!bullet.used && bullet.x > bulletDisappearLimit) {
      bullet.x -= 1;
      paintBullet(board, bullet);
      return bullet;
    }
  });

};

hit = () => {
  aliens.forEach((alien) => {
    bullets.forEach((bullet) => {
      if (
        !bullet.used &&
        !alien.killed &&
        bullet.x == alien.x &&
        Math.abs(bullet.y) == Math.abs(alien.y)
      ) {
        alien.killed = true;
        bullet.used = true;
        killedArmy++;
        bulletsUsed++;
      }
    });
  });
};

updateGameStats = () =>{
  var gameStats = document.getElementById("gameStats");
  gameStats.innerHTML = " Bullet Fired : "+bulletFired+" | Hit : "+ bulletsUsed + " | Kills : "+killedArmy;
}

paintAliens = (board) => {
  aliens.forEach((alien) => {
    createAlien(board, alien);
  });
};
let fireOption = prompt("Welcome to Space Fighter!!\n\nHow To Play?\n1. Move left by Left Arrow Key\n2. Move right with Right Arrow Key\n3. Fire using Arrow Up.\n\nHow would you like to fire? choose a Number.\n1. Auto\n2. Manual");
console.log(fireOption);
refreshBoard = () => {
  if(aliens.length == bulletsUsed){
    alert('Game Over!!\n Hit Refresh to Play again.');
    return;
  }
  updateGameStats();
  hit();
  var board = getBoard();
  paintAliens(board);
  createPlane(board);
  if(fireOption == 1)
    createBullet();
  fire(board);
};

renderGame = (curentTime) => {
  window.requestAnimationFrame(renderGame);
  if ((curentTime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = curentTime;
  refreshBoard();
};


createAliensArmy();
refreshBoard();

window.requestAnimationFrame(renderGame);


window.addEventListener("keydown", (e) => {
  switch (e.key) {

    case "ArrowLeft":
      if (planeLocation.y > leftLimit) {
        planeLocation.y -= 1;
      }
      break;

    case "ArrowRight":
      if (planeLocation.y < rightLimit) {
        planeLocation.y += 1;
      }
      break;

    case "ArrowUp":
      createBullet();
      break;

    default:
      break;
  }
});