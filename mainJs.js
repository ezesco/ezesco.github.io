var main = function() {
  setUpContentBoxes();
  window.onresize = setUpContentBoxes;
}

function $(string) {
  try {
    if (string[0] == ".") {
      return document.getElementsByClassName(string.slice(1));
    } else if (string[0] == "#") {
      return document.getElementById(string.slice(1));
    } else {
      return document.getElementsByTagName(string);
    }
  } catch (e) {
    console.log("There was an error:\n" + e);
  }

}

function setUpContentBoxes() {
  let minVisibleWidth = 360;
  let myBoxesArray = $(".contentBox");
  let currentScreenWidth = $("body")[0].offsetWidth;
  let boxesThatWillFit = Math.floor(currentScreenWidth / minVisibleWidth);
//   let percentageToTakeUp = formatPercentage( 1 / boxesThatWillFit);
  let desiredWidth = currentScreenWidth / boxesThatWillFit;
  desiredWidth -= 1;
  if (screen.width < 600) {
    desiredWidth = currentScreenWidth;
  }
  for (let box of myBoxesArray) {
    box.style.width = desiredWidth + "px";
    box.style.height = desiredWidth + "px";
  }
  
}

function formatPercentage( myFraction ) {
  let fractionString = myFraction.toString(); // "0.12345" ex
  fractionString = fractionString.slice(2); // "12345" ex
  //This operation would not work with 1/1 or 0/2
  //to resolve this, I will return 100% if the length of slice here is less that 2
  if (fractionString.length < 1) { return "100%" }
  fractionString += "00"; //this is to make sure there are enough units 
  fractionString = fractionString.slice(0,2) + "." + fractionString.slice(2); //"12.345" ex
  fractionString = fractionString.slice(0,5); //five units is enough units;
  fractionString += "%"; //gotta add that percent symbol for css functioning
  if (fractionString[0] == "0" && fractionString[1] != ".") {fractionString = fractionString.slice(1);}
  return fractionString;
}


window.onload = main;