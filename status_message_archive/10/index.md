<html>
  <p class=text>OMG THOMAS THE TANK ENGINE. i haven't had a proper conversation with you in a long time. thanks so much for being such a great friend when we were together at spiritridge and online. i know sometimes i got irritated with you but you were always understanding and you helped me get through. how's tyee going? we should talk again sometime!</p>
  <p class=text2><span id=d></span>:<span id=h></span>:<span id=m></span>:<span id=s></span>.<span id=mi></span></p>
</html>
<style>
.text{
  font-family: "Courier New";
  font-size: 20px
  }
.text2{
  text-align: center;
  font-family: "Courier New";
  font-size: 20px
  }
</style>
<script>
  var mi = 1;
  var s = mi*1000;
  var m = s*60;
  var h = m*60;
  var d = h*24;
  const final = 1640419200000;
window.setInterval(update, 11);
  function update() {
  const da = new Date();
    var time = final - da.getTime();
  if (time >= 0) {
  var num = ((time/mi)%1000).toString()
  for (var i = 0; i < 3-((time/mi)%1000).toString().length; i++){
  num = "0" + num
  }                                     
    document.getElementById("mi").innerHTML = num;
  num = (Math.floor(time/s)%60).toString();
  for (var i = 0; i < 2-(Math.floor(time/s)%60).toString().length; i++){
  num = "0" + num
  }                                                         
  document.getElementById("s").innerHTML = num;
  num = (Math.floor(time/m)%60).toString();
  for (var i = 0; i < 2-(Math.floor(time/m)%60).toString().length; i++){
  num = "0" + num
  }                                                         
  document.getElementById("m").innerHTML = num;
  num = (Math.floor(time/h)%24).toString();
  for (var i = 0; i < 2-(Math.floor(time/h)%24).toString().length; i++){
  num = "0" + num
  }                                                         
  document.getElementById("h").innerHTML = num;
  document.getElementById("d").innerHTML = (Math.floor(time/d)).toString();
  } else {
    document.getElementById("mi").innerHTML = '000';
    document.getElementById("s").innerHTML = '00';
    document.getElementById("m").innerHTML = '00';
    document.getElementById("h").innerHTML = '00';
    document.getElementById("d").innerHTML = '0';
  }
  }
</script>
