<html>
<form action="https://potato2017.github.io/">
<button type="submit">Back</button>
</form>
<p>0 "black" 1 "blue" 2 "brown" 3 "green" 4 "orange" 5 "purple" 6 "red" 7 "white" 8 "yellow"</p>
<canvas id="canvas" width="500" height="500"></canvas>
<textarea id=out></textarea>
</html>

<script>
var canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
var colors = ["black","blue","brown","green","orange","purple","red","white","yellow"];
var grid = [];
for (let i = 0; i < 10; i++) {
    grid.push(["black","black","black","black","black","black","black","black","black","black"]);
}
var currentColor = 0;

window.setInterval(update, 10);
function update() {
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
function updateOut() {
    final = ""
    for (let j = 0; j < grid.length; j++) {
        for (let i = 0; i < grid.length; i++) {

            final += ":";
            var color = grid[i][j];
            final += color;
            if (color === "black" || color === "white") {
                final += "_large_square";
            } else {
                final += "_square";
            }
            final += ":";
        }
        final += "\n";
    }
    document.getElementById("out").innerHTML = final;

}
function updateGrid(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;
    if (100 <= x && x <= 400 && 150 <= y && y <= 450) {
        grid[Math.floor((x-100)/30)][Math.floor((y-150)/30)] = colors[currentColor]
    }   
    updateOut();
}
     
let canvasElem = document.querySelector("canvas");
          
canvasElem.addEventListener("mousedown", function(e)
{
    updateGrid(canvasElem, e);
});
window.onkeydown = function() {
  if (event.key == 0 || event.key == 1 || event.key == 2 || event.key == 3 || event.key == 4 || event.key == 5 || event.key == 6 || event.key == 7 || event.key == 8){
      currentColor = parseInt(event.key);
  } else {
      currentColor = 0;
  }
}
</script>