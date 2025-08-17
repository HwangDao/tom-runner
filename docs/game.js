const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let tomImg = new Image();
tomImg.src = "assets/tom.png";

let towerImg = new Image();
towerImg.src = "assets/tower.png";

let bgImg = new Image();
bgImg.src = "assets/background.png";

let tom = { x: 50, y: 300, width: 50, height: 50, dy: 0, jump: false };
let gravity = 0.6;
let obstacles = [];
let frame = 0;
let gameOver = false;

document.addEventListener("keydown", e => {
  if (e.code === "Space" && !tom.jump) {
    tom.dy = -12;
    tom.jump = true;
  }
});

function drawTom() {
  ctx.drawImage(tomImg, tom.x, tom.y, tom.width, tom.height);
}

function drawObstacles() {
  for (let obs of obstacles) {
    ctx.drawImage(towerImg, obs.x, obs.y, obs.width, obs.height);
  }
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bgImg, 0, 0, canvas.width, canvas.height);

  // Tom
  tom.y += tom.dy;
  tom.dy += gravity;
  if (tom.y + tom.height >= 350) {
    tom.y = 350 - tom.height;
    tom.jump = false;
  }
  drawTom();

  // Obstacles
  if (frame % 100 === 0) {
    obstacles.push({ x: canvas.width, y: 300, width: 50, height: 50 });
  }
  for (let obs of obstacles) {
    obs.x -= 5;
    ctx.drawImage(towerImg, obs.x, obs.y, obs.width, obs.height);

    // Collision
    if (
      tom.x < obs.x + obs.width &&
      tom.x + tom.width > obs.x &&
      tom.y < obs.y + obs.height &&
      tom.y + tom.height > obs.y
    ) {
      gameOver = true;
      alert("Game Over!");
    }
  }

  frame++;
  requestAnimationFrame(update);
}

update();