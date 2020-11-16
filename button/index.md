<html>
<form action="https://potato2017.github.io/">
<button type="submit">Back</button>
</form>
<button type="button" onclick="updateCount()">Click</button>
<button type="button" onclick="buyFirst()" id="first">Increment +1 (50 money)</button>
<button type="button" onclick="buySecond()" id="second">Increment +1 (250 money)</button>
<button type="button" onclick="buyThird()" id="third">Increment +1 (1251 money)</button>
<button type="button" onclick="buyFourth()" id="fourth">Increment +1 (31252 money)</button>
<button type="button" onclick="buyFifth()" id="fifth">Increment +1 (156250 money)</button>
<p id="buttonCount">0</p>
</html>
<script>
var money = 0;
var increment = 1;
var boughtFirst = false;
var boughtSecond = false;
var boughtThird = false;
var boughtFourth = false;
var boughtFifth = false;
var updateCount = function() {
	money += increment;
	showCount();
}
var showCount = function() {
	document.getElementById("buttonCount").innerHTML = money;
}
var buyFirst = function() {
	if (!boughtFirst && money >= 50) {
		money -= 50;
		increment ++;
		boughtFirst = true;
		showCount();
		document.getElementById("first").innerHTML = "Already bought";
	}
}
var buySecond = function() {
	if (!boughtSecond && money >= 250) {
		money -= 250;
		increment ++;
		boughtFirst = true;
		showCount();
		document.getElementById("second").innerHTML = "Already bought";
	}
}
var buyThird = function() {
	if (!boughtThird && money >= 1251) {
		money -= 1251;
		increment ++;
		boughtFirst = true;
		showCount();
		document.getElementById("third").innerHTML = "Already bought";
	}
}
var buyFourth = function() {
	if (!boughtFourth && money >= 31252) {
		money -= 31252;
		increment ++;
		boughtFirst = true;
		showCount();
		document.getElementById("fourth").innerHTML = "Already bought";
	}
}
var buyFifth = function() {
	if (!boughtFifth && money >= 156250) {
		money -= 156250;
		increment ++;
		boughtFirst = true;
		showCount();
		document.getElementById("fifth").innerHTML = "Already bought";
	}
}
</script>