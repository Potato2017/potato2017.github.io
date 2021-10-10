var potatoes = 0;
var farmVal = 1;
var amt = [0,0,0,0];
var prices = [10,100,1000,10000];
const updateRate = 10
const perFrame = [1/1000*updateRate,8/1000*updateRate,50/1000*updateRate,200/1000*updateRate];
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
    if (potatoes >= prices[0]) document.getElementById("farmer").style.backgroundColor = "#4CAF50";
    else document.getElementById("farmer").style.backgroundColor = "white";
    if (potatoes >= prices[1]) document.getElementById("tractor").style.backgroundColor = "#4CAF50";
    else document.getElementById("tractor").style.backgroundColor = "white";
    if (potatoes >= prices[2]) document.getElementById("farmmanager").style.backgroundColor = "#4CAF50";
    else document.getElementById("farmmanager").style.backgroundColor = "white";
    if (potatoes >= prices[3]) document.getElementById("potatopeeler").style.backgroundColor = "#4CAF50";
    else document.getElementById("potatopeeler").style.backgroundColor = "white";
    document.getElementById("potatoes").innerHTML = Math.round(potatoes);
    document.getElementById("price1").innerHTML = Math.round(prices[0]);
    document.getElementById("price2").innerHTML = Math.round(prices[1]);
    document.getElementById("price3").innerHTML = Math.round(prices[2]);
    document.getElementById("price4").innerHTML = Math.round(prices[3]);
    document.getElementById("pps").innerHTML = Math.round(1000 / updateRate * (perFrame[0]*amt[0] + perFrame[1]*amt[1] + perFrame[2]*amt[2] + perFrame[3]*amt[3]));
}