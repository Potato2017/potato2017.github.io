<html>
<form action="https://potato2017.github.io/">
<button type="submit">Back</button>
</form>
<p class=topTitle>Avoid</p>
<p class=score>Score: <span id=score></span></p>
<p class=level>Level: <span id=level></span></p>
<canvas id="Game" width="500" height="500"></canvas>
</html>
<style>
.topTitle{
  text-align: center;
  font-family: "Courier New";
  font-size: 40px;
}
.score{
  text-align: center;
  font-family: "Courier New";
  font-size: 25px;
}
.level{
  text-align: center;
  font-family: "Courier New";
  font-size: 25px;
}
#Game {
  padding-left: 0;
  padding-right: 0;
  margin-left: auto;
  margin-right: auto;
  display: block;
  border: 5px solid black;
}
</style>
<script>
console.log("This game is still in the development phase! There are bound to be bugs!");
var canvas = document.getElementById("Game");
ctx = canvas.getContext("2d");
var obstacles = [];
var gameOver = true;
var score = 0;
var level = 1;
var levelOneDone = false;
var levelTwoDone = false;
var levelThreeDone = false;
var levelFourDone = false;
var spawnSpeed = 5;
var levelFiveDone = false;
var levelSixDone = false;
var levelSevenDone = false;
var levelEightDone = false;
var levelNineDone = false;
const DIRCHANGEINTERVAL = 1;
var dirChangeCooldown = 1;
var changeDirThisFrame = false;
var obstaclesIndexToRemove = []
window.setInterval(update, 10);
var player = {x: 250, y: 250};
function update() {
  if (gameOver) {
    drawStart(); //draw the start
  } else {
    updateFrames();
  }
}
function drawStart() {
  score = 0;
  level = 1;
  levelOneDone = false;
  levelTwoDone = false;
  levelThreeDone = false;
  levelFourDone = false;
  levelFiveDone = false;
  levelSixDone = false;
  levelSevenDone = false;
  levelEightDone = false;
  levelNineDone = false;
  spawnSpeed = 1;
  ctx.font = "25px Courier New";
  ctx.fillText('Press "a" to start', 10, 25);
}
window.onkeyup = function() {
  if (gameOver && event.key == "a") {
    gameOver = false; //test if game is over
    obstacles=[];
    drawBackground();
    player.y = 240;
    player.x = 240;
  }
};
window.onkeydown = function() {
  if (event.key == "w" || event.key == "ArrowUp"){
      player.y -= 10;
      if (player.y < 0){
          player.y = 0;
      }
  }
  if (event.key == "a" || event.key == "ArrowLeft"){
      player.x -= 10;
      if (player.x < 0) {
          player.x = 0;
      }
  }
  if (event.key == "s" || event.key == "ArrowDown"){
      player.y += 10;
      if (player.y > 480) {
          player.y = 480;
      }
  }
  if (event.key == "d" || event.key == "ArrowRight"){
      player.x += 10;
      if (player.x > 480) {
          player.x = 480;
      }
  }
}
var spawnerCoolDown = 30/Math.pow(spawnSpeed,2);
function updateFrames() {
  drawBackground();
  drawObstacles();
  drawPlayer();
  if (score == 1 && !levelOneDone) {
    spawnSpeed ++;
    levelOneDone = true;
    level = 2;
  }
  if (score == 3 && !levelTwoDone) {
    spawnSpeed ++;
    levelTwoDone = true;
    level = 3;
  }
  if (score == 5 && !levelThreeDone) {
    spawnSpeed ++;
    levelThreeDone = true;
    level = 4;
  }
  if (score == 10 && !levelFourDone) {
    spawnSpeed ++;
    levelFourDone = true;
    level = 5;
  }
  if (score == 15 && !levelFiveDone) {
    spawnSpeed ++;
    levelFiveDone = true;
    level = 6;
  }
  if (score == 20 && !levelSixDone) {
    spawnSpeed ++;
    levelSixDone = true;
    level = 7;
  }
  if (score == 25 && !levelSevenDone) {
    spawnSpeed ++;
    levelSevenDone = true;
    level = 8;
  }
  if (score == 50 && !levelEightDone) {
    spawnSpeed ++;
    levelEightDone = true;
    level = 9;
  }
  if (score == 100 && !levelNineDone) {
    spawnSpeed ++;
    levelNineDone = true;
    level = 10;
  }
  document.getElementById("score").innerHTML = score;
  document.getElementById("level").innerHTML = level;
  spawnerCoolDown--;
  dirChangeCooldown--;
  if (dirChangeCooldown == 0) {
      changeDirThisFrame = true;
      dirChangeCooldown = DIRCHANGEINTERVAL
  } else {
      changeDirThisFrame = false;
  }
  if (spawnerCoolDown <= 0) {
      spawnObstacle();
  }
  for (var i = 0; i < obstacles.length; i++){
    if (obstacles[i] == undefined || obstacles[i] == null) {
      continue;
    }
      if (changeDirThisFrame) {
          obstacles[i].direction = (Math.PI*(Math.floor(Math.random() * 360)))/180;
      }
      obstacles[i].x += Math.floor(2*Math.cos(obstacles[i].direction));
      obstacles[i].y -= Math.floor(2*Math.sin(obstacles[i].direction));
      if (obstacles[i].x <= player.x + 20 &&
        obstacles[i].x + 20 >= player.x &&
       obstacles[i].y <= player.y + 20 &&
       obstacles[i].y + 20 >= player.y) {
      gameOver=true;
    }
      if (obstacles[i].timeToLive == 0) {
          obstacles.splice(i,1);
          i--;
          score++;
          continue;
      }
      obstacles[i].timeToLive--;
  }
}
function drawPlayer(){
  ctx.fillStyle = "black";
  ctx.fillRect(player.x, player.y, 20, 20);
}
function spawnObstacle() {
  //spawn an obstacle
  var obstacle = null;
  if (Math.random() < 0.5) {
    obstacle = {
    x: Math.floor(Math.random()*(player.x-50)),
    y: Math.floor(480*Math.random()),
    direction: 0,
    timeToLive: 500
    };
  } else {
    obstacle = {
    x: Math.floor(Math.random()*(450-player.x))+player.x+30,
    y: Math.floor(480*Math.random()),
    direction: 0,
    timeToLive: 500
  };
}
  obstacles.push(obstacle);
  spawnerCoolDown = 100+Math.floor(Math.random() * 50)/Math.pow(spawnSpeed,2);
}
function drawObstacles() {
  for (var i = 0; i < obstacles.length; i+=1) {
    var obstacle = obstacles[i]; // add var
    ctx.beginPath();
    ctx.rect(obstacle.x, obstacle.y, 20, 20);
    ctx.fillStyle = "lime";
    ctx.fill();
  }
}
function drawBackground() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white"; //hide words
  ctx.fill();
  ctx.beginPath();
}
</script>