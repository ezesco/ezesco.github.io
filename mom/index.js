const main = function () {
  setMomDogHeight();
}

function setMomDogHeight () {
  const momDogHeightContainer = document.getElementById("momDogImg");
  const desiredHeight = momDogHeightContainer.clientWidth;
  momDogHeightContainer.style.height = desiredHeight+"px";
}

window.onload = main;