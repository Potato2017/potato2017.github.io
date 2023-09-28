athtml = document.getElementById('at');
ATDISPLAYTIME = 250;
var currentAT = []
function displayAT(text, time) {
	currentAT.push([text, time]);
}
function tickAT() {
	let currentATTemp = currentAT.slice();
	currentAT = [];
	ATText = '';
	for (var i = 0; i < currentATTemp.length; i++) {
		currentATTemp[i][1] -= 1
		if (currentATTemp[i][1] !== 0) {
			currentAT.push(currentATTemp[i])
		}
		

	}
	for (var i = 0; i < currentAT.length; i++) {
		ATText += '</p><p style="color: rgba(255, 255, 255, ' + (currentATTemp[currentATTemp.length-i-1][1]/ATDISPLAYTIME).toString() + ')!important;">';
		ATText += currentATTemp[currentATTemp.length-i-1][0]
	}
	athtml.innerHTML = ATText;
}