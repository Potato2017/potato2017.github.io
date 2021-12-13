<html>
  <p><span id=mi></span> milliseconds</p>
  <p>or</p>
  <p><span id=s></span> seconds</p>
  <p>or</p>
  <p><span id=m></span> minutes</p>
  <p>or</p>
  <p><span id=h></span> hours</p>
  <p>or</p>
  <p><span id=d></span> days</p>
</html>
<script>
  var mi = 1;
  var s = mi*1000;
  var m = s*60;
  var h = m*60;
  var d = h*24;
  const da = new Date();
  const final = 1640419200000;
  
window.setInterval(update, 11);
  function update() {
    var time = final - da.getTime();
    document.getElementById("mi").innerHTML = (time/mi).toString();
  document.getElementById("s").innerHTML = (time/s).toString();
  document.getElementById("m").innerHTML = (time/m).toString();
  document.getElementById("h").innerHTML = (time/h).toString();
  document.getElementById("d").innerHTML = (time/d).toString();
  }
</script>
