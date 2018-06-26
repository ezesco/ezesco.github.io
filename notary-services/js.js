var main = function () {
	$("#schedule").addEventListener("click", function(){_launch("schedulePage")});
	$("#contact").addEventListener("click", function(){_launch("contactPage")});
	$("#about").addEventListener("click", function(){_launch("aboutPage")});
	
	$("#messageToUs").addEventListener("keyup", resizeTextArea);
}

function $(myString) {
	try {
		if (myString[0] == ".") {
			return document.getElementsByClassName(myString.slice(1));
		} else if (myString[0] == "#") {
			return document.getElementById(myString.slice(1));
		} else {
			return document.getElementsByTagName(myString);
		}
	} catch (e) {
		console.log("There was an error with $ as following:\n\n"+
		e +
		"\n\n End Error Message");
	}
}

var pageActive;
function _launch ( page ) {
	if (pageActive) {
		pageActive.className = pageActive.className.split("circleActive")[0];
	}
	pageActive = $("#"+page.slice(0,-4));
	pageActive.className += " circleActive ";
	let webpages = $(".webPage");
	for (webpage of webpages) {
		webpage.style.display = "none";
	}
	$("#"+page).style.display = "block";
}

var textLastHeight;
function resizeTextArea() {
	if (this.scrollHeight < 103) {
		return
	}
	let totalEm = this.value.split("\n").length + 2;
	this.style.height = totalEm + "em";
	if (this.scrollHeight > this.offsetHeight) {
		this.style.height = this.scrollHeight + "px";
	}
}


window.onload = main;