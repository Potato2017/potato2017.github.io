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
var perFrame = [0.05,0.6,5,40]
window.setInterval(update,10)
var farm = function() {
    potatoes += farmVal;
}
var farmer = function() {
    amts[0]++;
    prices[0]*=1.2;
}
var tractor = function() {
    amts[1]++;
    prices[1]*=1.2;
}
var farmmanager = function() {
    amts[2]++;
    prices[2]*=1.2;
}
var potatopeeler = function() {
    amts[3]++;
    prices[3]*=1.2;
}
function update() {
    for(var i = 0; i < 4; i++) {
        potatoes += amts[i]*perFrame[i]
    }
    document.getElementById("potatoes").innerHTML = money;
    document.getElementById("price1").innerHTML = prices[0];
    document.getElementById("price2").innerHTML = prices[1];
    document.getElementById("price3").innerHTML = prices[2];
    document.getElementById("price4").innerHTML = prices[3];
}
</script>
