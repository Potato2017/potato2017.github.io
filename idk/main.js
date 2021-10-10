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