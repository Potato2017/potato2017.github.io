const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'green';
ctx.fillRect(0,0,innerWidth,innerHeight);
ctx.fillStyle = 'black';
ctx.fillRect(innerWidth/3,innerHeight/2,innerWidth/10,innerHeight/10);
ctx.fillRect(innerWidth/2,innerHeight/2,innerWidth/10,innerHeight/10);
ctx.fillRect(2*innerWidth/3,innerHeight/2,innerWidth/10,innerHeight/10);
ctx.fillStyle = 'white';
ctx.font = '30px Courier New';
ctx.textAlign = 'center';
ctx.fillText('Start', innerWidth/3+innerWidth/20, innerHeight/2+innerHeight/20);
ctx.fillText('Stop', innerWidth/2+innerWidth/20, innerHeight/2+innerHeight/20);
ctx.fillText('Reset', 2*innerWidth/3+innerWidth/20, innerHeight/2+innerHeight/20);
var ds = 0;
var running = false;
document.onclick = (event) => {
    const x = event.clientX;
    const y = event.clientY;
    if (x > innerWidth/3 && x < (innerWidth/3+innerWidth/10) && y > innerHeight/2 && y < innerHeight/2+innerHeight/10) running = true;
    if (x > innerWidth/2 && x < (innerWidth/2+innerWidth/10) && y > innerHeight/2 && y < innerHeight/2+innerHeight/10) running = false;
    if (x > 2*innerWidth/3 && x < (2*innerWidth/3+innerWidth/10) && y > innerHeight/2 && y < innerHeight/2+innerHeight/10) {
        ds = 0;
        running = false;
    }
}
window.setInterval(() => {
    ctx.fillStyle = 'green';
    ctx.fillRect(0, innerHeight/3-innerHeight/30, innerWidth, innerHeight/15);
    ctx.fillStyle = 'white';
    ctx.fillText(`${ds/100}`, innerWidth/2, innerHeight/3);
    if (running) ds += 1;
}, 10);