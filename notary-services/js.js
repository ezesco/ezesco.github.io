var main = function () {
	$("#schedule").addEventListener("click", function(){_launch("schedulePage")});
	$("#contact").addEventListener("click", function(){_launch("contactPage")});
	$("#about").addEventListener("click", function(){_launch("aboutPage")});
	
	$("#messageToUs").addEventListener("keyup", resizeTextArea);
	
	setUpSchedulePage();
	$("#emailSelected").addEventListener("click", function(){_show($("#emailContainer"))});
	$("#phoneSelected").addEventListener("click", function(){_show($("#phoneContainer"))});
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

function setUpSchedulePage() {
	let dateInput = $("#myDay");
	let timeInput = $("#myTime");
	let currentDate = new Date();
	let timeString;
	if ( (currentDate.getHours()).toString().length < 2 ) {
		timeString = "0" + currentDate.getHours();
	} else {
		timeString = (currentDate.getHours()).toString();
	}
	if ( (currentDate.getMinutes()).toString().length < 2 ) {
		timeString += ":0" + currentDate.getMinutes();
	} else {
		timeString += ":"+currentDate.getMinutes();
	}
	timeInput.value = timeString;
	let dateString = currentDate.getFullYear() + "-";
	if ( (currentDate.getMonth()+1).toString().length < 2 ) {
		dateString += "0"+ (currentDate.getMonth()+1) +"-"
	} else {
		dateString += currentDate.getMonth() + 1 +"-";
	}
	if ( (currentDate.getDate()+1).toString().length < 2 ) {
		dateString += "0"+ currentDate.getDate()
	} else {
		dateString += currentDate.getDate();
	}
	dateInput.value = dateString;
}

function _show(elemnt) {
	$("#emailContainer").style.display = "none";
	$("#emailSelected").checked = false;
	$("#phoneContainer").style.display = "none";
	$("#phoneSelected").checked = false;
	
	elemnt.style.display = "block";
	let theId = elemnt.id;
	theId = theId.slice(0, -9);
	$("#"+theId+"Selected").checked = true;
}


//calendar tools 
Date.prototype.dayM = [
	6,
	0,
	1,
	2,
	3,
	4,
	5
]
Date.prototype.getDayM = function () {
	let normalDay = this.getDay();
	let dayMString = this.dayM[normalDay];
	return dayMString;
}

//end calendar tools 


window.onload = main;