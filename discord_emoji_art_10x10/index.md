<html>
<form action="https://potato2017.github.io/">
<button type="submit">Back</button>
</form>
<canvas id="canvas" width="500" height="500"></canvas>
<script>
window.onload = function() {
var canvas = document.getElementById("Game");
ctx = canvas.getContext("2d");
var colors = ["black","blue","brown","green","orange","purple","red","white"];
var grid = [];
for (let i = 0; i < 10; i++) {
    grid.push(["black","black","black","black","black","black","black","black","black","black"]);
}
var currentColor = 0;
window.setInterval(update, 10);
}
function updateFrames() {
  drawTop();
  drawSquares();
}
function drawTop(){
  ctx.fillStyle = colors[currentColor];
  ctx.fillRect(100, 0, 300, 100);
}
function drawSquares(){
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid.length; j++) {
            ctx.fillStyle = grid[i][j];
            ctx.fillRect(30*i+100, 30*j+150, 30, 30)
        }
    }
}
function updateGrid(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if (100 <= x && x <= 400 && 150 <= y && y <= 450) {
        grid[(x-100)/30][(x-150)/30] = colors[currentColor]
    }
}
let canvasElem = document.querySelector("canvas");       
canvasElem.addEventListener("mousedown", function(e)
{
    getMousePosition(canvasElem, e);
});
window.onkeydown = function() {
  if (parseInt(event.key) !== NaN){
      currentColor = event.key
  }
}
</script>

<p class=out><span id=out></span></p>
</html>

