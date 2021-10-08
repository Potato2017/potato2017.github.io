<html>
<form action="https://potato2017.github.io/">
<button type="submit">Back</button>
</form>
<p class=topTitle>Dash</p>
<p class=score>Score: <span id=score></span></p>
<p class=level>Level: <span id=level></span></p>
<canvas id="Game" width="1000" height="300"></canvas>
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
var canvas = document.getElementById("Game");
ctx = canvas.getContext("2d");
var obstacles = [];
var gameOver = true;
var groundLevel = canvas.height - 50;
var score = 0;
var level = 1;
var levelOneDone = false;
var levelTwoDone = false;
var levelThreeDone = false;
var levelFourDone = false;
var scrollSpeed = 1;
var levelFiveDone = false;
var levelSixDone = false;
var levelSevenDone = false;
var levelEightDone = false;
var levelNineDone = false;
var yVel = 0;
window.setInterval(update, 10);
var player = {x: 100, y: groundLevel - 20};
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
  scrollSpeed = 1;
  ctx.font = "25px Courier New";
  ctx.fillText('Press "a" to start', 10, 25);
}
window.onkeyup = function() {
  if (gameOver && event.key == "a") {
    gameOver = false; //test if game is over
    obstacles=[];
    drawBackground();
    player.y = groundLevel - 20;
    player.x = 100;
  }
};
window.onkeydown = function() {
  if (event.key == "ArrowUp"){
    yVel = -4;
  }
}
var spawnerCoolDown = 30/Math.pow(scrollSpeed,2);
function updateFrames() {
  drawBackground();
  drawObstacles();
  drawPlayer();
  if (score == 10 && !levelOneDone) {
    scrollSpeed ++;
    levelOneDone = true;
    level = 2;
  }
  if (score == 25 && !levelTwoDone) {
    scrollSpeed ++;
    levelTwoDone = true;
    level = 3;
  }
  if (score == 50 && !levelThreeDone) {
    scrollSpeed ++;
    levelThreeDone = true;
    level = 4;
  }
  if (score == 100 && !levelFourDone) {
    scrollSpeed ++;
    levelFourDone = true;
    level = 5;
  }
  if (score == 150 && !levelFiveDone) {
    scrollSpeed ++;
    levelFiveDone = true;
    level = 6;
  }
  if (score == 200 && !levelSixDone) {
    scrollSpeed ++;
    levelSixDone = true;
    level = 7;
  }
  if (score == 250 && !levelSevenDone) {
    scrollSpeed ++;
    levelSevenDone = true;
    level = 8;
  }
  if (score == 500 && !levelEightDone) {
    scrollSpeed ++;
    levelEightDone = true;
    level = 9;
  }
  if (score == 1000 && !levelNineDone) {
    scrollSpeed ++;
    levelNineDone = true;
    level = 10;
  }
  document.getElementById("score").innerHTML = score;
  document.getElementById("level").innerHTML = level;
  spawnerCoolDown--;
  if (spawnerCoolDown <= 0) {
    spawnObstacle();
  }
  for (var i = 0; i < obstacles.length; i++) { // relocated
    obstacles[i].x -= scrollSpeed;
    if (obstacles[i].x < 0) {
      obstacles.splice(i, 1);
      score++;
    }
    if (obstacles[i].x <= player.x + 20 &&
        obstacles[i].x + obstacles[i].width >= player.x &&
       obstacles[i].y <= player.y + 20 &&
       obstacles[i].y + obstacles[i].height >= player.y) {
      gameOver=true;
    }
  }
  if (player.y < 0) {
    player.y = 0;
  }
  if (player.y + 20 >= groundLevel) {
    player.y = groundLevel - 40;
  }
  if (player.x < 0) {
    player.x = 0;
  }
  if (player.x + 20 >= canvas.width) {
    player.x = canvas.width - 20;
  }
}
function drawPlayer(){
  player.y += yVel
  ctx.fillStyle = "lime";
  ctx.fillRect(player.x, player.y, 20, 20);
  if (yVel < 10) {
  yVel+=0.2;
  }
}
function spawnObstacle() {
  //spawn an obstacle
  var obstacle = {
    x: canvas.width,
    y: Math.floor(Math.random() * (canvas.height-70)),
    width: 20,
    height: Math.floor(Math.random() * 50)+50
  };
  obstacles.push(obstacle);
  spawnerCoolDown = 100 + Math.floor(Math.random() * 50)/Math.pow(scrollSpeed,2);
}
function drawObstacles() {
  for (var i = 0; i < obstacles.length; i+=1) {
    var obstacle = obstacles[i]; // add var
    ctx.beginPath();
    ctx.rect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    ctx.fillStyle = "red";
    ctx.fill();
  }
}
function drawBackground() {
  ctx.beginPath();
  ctx.rect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "white"; //hide words
  ctx.fill();
  ctx.beginPath();
  ctx.rect(0, groundLevel, canvas.width, canvas.height);
  ctx.fillStyle = "black"; //ground
  ctx.fill();
}

</script>
