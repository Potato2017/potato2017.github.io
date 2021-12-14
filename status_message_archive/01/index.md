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
    document.getElementById("mi").innerHTML = ((time/mi)%1000).toString();
  document.getElementById("s").innerHTML = (Math.floor(time/s)%60).toString();
  document.getElementById("m").innerHTML = (Math.floor(time/m)%60).toString();
  document.getElementById("h").innerHTML = (Math.floor(time/h)%24).toString();
  document.getElementById("d").innerHTML = (Math.floor(time/d)).toString();
  }
</script>
