<html>
<form action="https://potato2017.github.io/">
<button type="submit">Back</button>
</form>
<button type="button" onclick="press()">CLICK</button>
<button type="button" onclick="buy()" id="buy">Next Increment: x || Cost: x</button>
<p id="number">Number: x</p>
<p id="inc">Increment: x</p>
<p id="tc">Total Clicks: x</p>
</html>
<script>

var setCookie = function(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var getCookie = function(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var getCost = function(cinc) {
  return 50*Math.pow(2, cinc-1)
}
var press = function() {
  number += increment;
  totalclicks++;
  updateText();
  updateCookies();
}
var updateCookies = function() {
  setCookie("number", number.toString(), 99999);
  setCookie("tc", totalclicks.toString(), 99999);
  setCookie("inc", increment.toString(), 99999);
}
var updateText = function() {
  console.log(number);
  document.getElementById("number").innerHTML = `Number: ${number}`;
  document.getElementById("inc").innerHTML = `Increment: ${increment}`;
  document.getElementById("buy").innerHTML = `Next Increment: ${increment+1} || Cost: ${getCost(increment)}`;
  document.getElementById("tc").innerHTML = `Total Clicks: ${totalclicks}`;
}
var buy = function() {
  if (number >= getCost(increment)) {
    number -= getCost(increment);
    increment++;
    updateText();
    updateCookies();
  }
}


var number = getCookie("number");
if (number == "") {
  setCookie("number", "0", 99999);
  number = 0;
  console.log("f")
} else number = parseInt(number);
  
var totalclicks = getCookie("tc");
if (totalclicks == "") {
  setCookie("tc", "0", 99999);
  totalclicks = 0;
} else totalclicks = parseInt(totalclicks);
  
var increment = getCookie("inc");
if (increment == "") {
  setCookie("inc", "1", 99999);
  increment = 1;
} else increment = parseInt(increment);
  
updateText();
</script>
