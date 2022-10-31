let lastPaintTime = 0;
let speed = 12;

let gameboardDiamension = document.getElementById("gameboard");
let planeLocation = {
  x: 100,
  y: 10,
};

let bullets = [];
let aliens = [];
let killedArmy = 0;
let bulletsUsed = 0;
let bulletFired = 0;
let leftLimit = 0;
let rightLimit = gameboardDiamension.clientWidth / 50;
let bulletDisappearLimit = 0;

createAliensArmy = () => {
  for (var x = 1; x <= 5; x++) {
    for (var y = leftLimit; y < rightLimit; y++) {
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

moveLeft = () => {
  if (planeLocation.y > leftLimit) {
    planeLocation.y -= 1;
  }
}

moveRight = () => {
  if (planeLocation.y < rightLimit) {
    planeLocation.y += 1;
  }
}

updateGameStats = () => {
  var gameStats = document.getElementById("gameStats");
  gameStats.innerHTML = " Bullet Fired : " + bulletFired + " | Hit : " + bulletsUsed + " | Kills : " + killedArmy;
}

paintAliens = (board) => {
  aliens.forEach((alien) => {
    createAlien(board, alien);
  });
};
let fireOption = prompt("Welcome to Space Fighter!!\n\nHow To Play?\n1. Move left by Left Arrow Key\n2. Move right with Right Arrow Key\n3. Fire using Arrow Up.\n\nHow would you like to fire? choose a Number.\n1. Auto\n2. Manual");
1
refreshBoard = () => {
  if (aliens.length == bulletsUsed) {
    alert('Game Over!!\n\n' + document.getElementById("gameStats").innerHTML + '\n Hit Refresh to Play again.');
    return;
  }
  updateGameStats();
  hit();
  var board = getBoard();
  paintAliens(board);
  createPlane(board);
  if (fireOption == 1)
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
      moveLeft();
      break;

    case "ArrowRight":
      moveRight();
      break;

    case "ArrowUp":
      createBullet();
      break;

    default:
      break;
  }
});


//for mobile
document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches || // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      moveLeft();
     
    } else {
      /* left swipe */
      moveRight();
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
      createBullet();
    } else {
      /* up swipe */
      
    }
  }
  /* reset values */
  xDown = null;
  yDown = null;
};
