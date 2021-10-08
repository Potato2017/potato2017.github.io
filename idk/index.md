<html>
<form action="https://potato2017.github.io/">
<button type="submit">Back</button>
</form>
<p class=topTitle>idk</p>
<p class=potatoes><span id=potatoes></span> potatoes grown</p>
<p class=pps><span id=pps></span> potatoes per second</p>
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
.pps{
  text-align: center;
  font-family: "Courier New";
  font-size: 15px;
}
</style>
<script>
var potatoes = 0;
var farmVal = 1;
var amt = [0,0,0,0];
var prices = [10,100,1000,10000];
const perFrame = [0.01,0.6,2,10];
const updateRate = 10
window.setInterval(update,updateRate);
var farm = function() {
    potatoes += farmVal;
}
var farmer = function() {
    if (potatoes < prices[0]) return;
    potatoes -= prices[0]
    amt[0]++;
    prices[0]*=1.2;
}
var tractor = function() {
    if (potatoes < prices[1]) return;
    potatoes -= prices[1]
    amt[1]++;
    prices[1]*=1.2;
}
var farmmanager = function() {
    if (potatoes < prices[2]) return;
    potatoes -= prices[2]
    amt[2]++;
    prices[2]*=1.2;
}
var potatopeeler = function() {
    if (potatoes < prices[3]) return;
    potatoes -= prices[3]
    amt[3]++;
    prices[3]*=1.2;
}
function update() {
    for(var i = 0; i < 4; i++) {
        potatoes += amt[i]*perFrame[i];
    }
    document.getElementById("potatoes").innerHTML = Math.round(potatoes);
    document.getElementById("price1").innerHTML = Math.round(prices[0]);
    document.getElementById("price2").innerHTML = Math.round(prices[1]);
    document.getElementById("price3").innerHTML = Math.round(prices[2]);
    document.getElementById("price4").innerHTML = Math.round(prices[3]);
    document.getElementById("pps").innerHTML = Math.round(1000 / updateRate * (perFrame[0]*amt[0] + perFrame[1]*amt[1] + perFrame[2]*amt[2] + perFrame[3]*amt[3]));
}
</script>
