<p>replace "00" in the url with the number.</p>
<p>text that i will write will hopefully be there before the countdown is up.</p>

<input type="text" id="num">
<button onclick="go()">go</button>
<script>
function go() {
  var x = document.getElementById("num").value;
  window.location.href = 'https://potato2017.github.io/status_message_archive/' + x;
}
</script>