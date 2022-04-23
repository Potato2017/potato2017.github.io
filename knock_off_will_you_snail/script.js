var canvas = document.getElementById("Game");
ctx = canvas.getContext("2d");

var enemyQueue = []; // x, y, timeLeft
var currEnemies = []; // x, y, timeLeft
var player = {x: canvas.width/2, y: canvas.height/2};
var n = 0;
const SPEED = 2;
const SHOWUPTIME = 75;
const STAYTIME = 150;
const SPAWNFREQ = 40;
var score = 0;
var keysDown = {up: false, down: false, left: false, right: false};
var gameOver = true;
window.setInterval(update, 10);
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    kd.tick();
    document.getElementById('score').innerHTML = score;
    if (!gameOver) {
        n++;
        if (n === SPAWNFREQ) {
            n = 0;
            nextPositions = calcNextPositions();
            for (var i = 0; i < nextPositions.length; i++) {
                enemyQueue.push({x: nextPositions[i].x, y: nextPositions[i].y, timeLeft: SHOWUPTIME});
            }
        }
        updateEnemyQueue();
        updateCurrEnemies();
        detectLoss();
        draw();
    } else {
        ctx.font = '48px courier';
        ctx.fillStyle = 'black';
        ctx.fillText('press a to start!', 0, 48);
    }
}
function calcNextPositions() {
    var xOffset = 0;
    var yOffset = 0;
    if (keysDown.up) yOffset -= SHOWUPTIME*0.9*SPEED;
    if (keysDown.down) yOffset += SHOWUPTIME*0.9*SPEED;
    if (keysDown.left) xOffset -= SHOWUPTIME*0.9*SPEED;
    if (keysDown.right) xOffset += SHOWUPTIME*0.9*SPEED;
    var nextLocation = {x: player.x+xOffset, y: player.y+yOffset};
    var nextLocation2 = {x: player.x+xOffset, y: player.y+yOffset};
    var r = Math.random();
    if (r < 0.5) {
        if (xOffset > 0) nextLocation2.x -= SHOWUPTIME*1.5*SPEED;
        if (xOffset < 0) nextLocation2.x += SHOWUPTIME*1.5*SPEED;
    } else {
        if (yOffset > 0) nextLocation2.y -= SHOWUPTIME*1.5*SPEED;
        if (yOffset < 0) nextLocation2.y += SHOWUPTIME*1.5*SPEED;
    }
    return [nextLocation, nextLocation2];
}
function updateEnemyQueue() {
    var temp = [];
    for (var i = 0; i < enemyQueue.length; i++) {
        enemy = enemyQueue[i]
        if (enemy.timeLeft) {
            enemy.timeLeft--;
            temp.push(enemy);
        }
        else {
            enemy.timeLeft = STAYTIME;
            currEnemies.push(enemy);
        }
    }
    enemyQueue = temp.map((x) => x)
}
function updateCurrEnemies() {
    var temp = [];
    for (var i = 0; i < currEnemies.length; i++) {
        enemy = currEnemies[i]
        if (enemy.timeLeft) {
            enemy.timeLeft--;
            temp.push(enemy);
        } else {
            score++;
        }
    }
    currEnemies = temp.map((x) => x)
}
function detectLoss() {
    for (var i = 0; i < currEnemies.length; i++) {
        enemy = currEnemies[i];
        if (((enemy.x <= player.x && enemy.x >= player.x-40) || (enemy.x >= player.x && enemy.x <= player.x+40)) && ((enemy.y <= player.y && enemy.y >= player.y-40) || (enemy.y >= player.y && enemy.y <= player.y+40))) {
            gameOver = true;
            console.log(enemy);
            console.log(player);
        }
    }
}
function draw() {
    for (var i = 0; i < enemyQueue.length; i++) {
        ctx.fillStyle = 'rgb(255, 255, 0, ' + (SHOWUPTIME-enemyQueue[i].timeLeft)/SHOWUPTIME + ')';
        ctx.fillRect(enemyQueue[i].x, enemyQueue[i].y, 40, 40);
    }
    for (i = 0; i < currEnemies.length; i++) {
        ctx.fillStyle = 'rgb(255, 0, 0, 1)';
        ctx.fillRect(currEnemies[i].x, currEnemies[i].y, 40, 40);
    }
    ctx.fillStyle = 'rgb(0, 255, 0, 1)';
    ctx.fillRect(player.x, player.y, 40, 40);
}
kd.UP.down(() => {
    keysDown.up = true;
    player.y -= SPEED;
});
kd.DOWN.down(() => {
    keysDown.down = true;
    player.y += SPEED;
});
kd.LEFT.down(() => {
    keysDown.left = true;
    player.x -= SPEED;
});
kd.RIGHT.down(() => {
    keysDown.right = true;
    player.x += SPEED;
});
kd.UP.up(() => {
    keysDown.up = false;
});
kd.DOWN.up(() => {
    keysDown.down = false;
});
kd.LEFT.up(() => {
    keysDown.left = false;
});
kd.RIGHT.up(() => {
    keysDown.right = false;
});
kd.A.down(() => {
    gameOver = false;
    score = 0;
    enemyQueue = [];
    currEnemies = [];
    player = {x: canvas.width/2, y: canvas.height/2};
})