<html>
<form action="https://potato2017.github.io/">
<button type="submit">Back</button>
</form>
<p class=topTitle>idk</p>
<p class=potatoes><span id=potatoes></span> potatoes grown</p>
<button type="button" onclick="farm()">Farm</button>
<button type="button" onclick="farmer()" id="farmer">Farmer $<span id=price1></span></button>
<button type="button" onclick="tractor()" id="tractor">Tractor $<span id=price2></span></button>
<button type="button" onclick="farmmanager()" id="farmmanager">Farm Manager $<span id=price3></span></button>
<button type="button" onclick="potatopeeler()" id="potatopeeler">Potato Peeler $<span id=price4></span></button>
</html>
<style>
.topTitle{
  text-align: center;
  font-family: "Courier New";
  font-size: 40px;
}
.potatoes{
  text-align: center;
  font-family: "Courier New";
  font-size: 25px;
}
</style>
<script>
var potatoes = 0;
var farmVal = 1;
var amts = [0,0,0,0];
var prices = [10,100,1000,10000];
var perFrame = [0.05,0.6,5,40];
window.setInterval(update,10);
var farm = function() {
    potatoes += farmVal;
}
var farmer = function() {
    if (potatoes < prices[0]) return;
    potatoes -= prices[0]
    amts[0]++;
    prices[0]*=1.2;
    prices[0] = Math.round(prices[0] * 100) / 100
}
var tractor = function() {
    if (potatoes < prices[1]) return;
    potatoes -= prices[1]
    amts[1]++;
    prices[1]*=1.2;
    prices[1] = Math.round(prices[1] * 100) / 100
}
var farmmanager = function() {
    if (potatoes < prices[2]) return;
    potatoes -= prices[2]
    amts[2]++;
    prices[2]*=1.2;
    prices[2] = Math.round(prices[2] * 100) / 100
}
var potatopeeler = function() {
    if (potatoes < prices[3]) return;
    potatoes -= prices[3]
    amts[3]++;
    prices[3]*=1.2;
    prices[3] = Math.round(prices[3] * 100) / 100
}
function update() {
    for(var i = 0; i < 4; i++) {
        potatoes += amts[i]*perFrame[i];
    }
    potatoes = Math.round(potatoes * 100) / 100
    document.getElementById("potatoes").innerHTML = potatoes;
    document.getElementById("price1").innerHTML = prices[0];
    document.getElementById("price2").innerHTML = prices[1];
    document.getElementById("price3").innerHTML = prices[2];
    document.getElementById("price4").innerHTML = prices[3];
}
</script>
