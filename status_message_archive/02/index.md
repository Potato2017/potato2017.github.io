<html>
  <p class=text><span id=d></span>:<span id=h></span>:<span id=m></span>:<span id=s></span>.<span id=mi></span></p>
</html>
<style>
.text{
  text-align: center;
  font-family: "Courier New";
  font-size: 40px
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
  }
</script>