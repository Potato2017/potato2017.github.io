<html>
  <p class=text><span id=mi></span> milliseconds = <span id=s></span> seconds = <span id=m></span> minutes = <span id=h></span> hours = <span id=d></span> days</p>
</html>
<style>
.text{
  text-align: center;
  font-family: "Courier New";
  font-size: 25px
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
    document.getElementById("mi").innerHTML = (time/mi).toString();
  document.getElementById("s").innerHTML = (time/s).toString();
  document.getElementById("m").innerHTML = (time/m).toString();
  document.getElementById("h").innerHTML = (time/h).toString();
  document.getElementById("d").innerHTML = (time/d).toString();
  }
</script>
