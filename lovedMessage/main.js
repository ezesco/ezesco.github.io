const main = function () {
  equipDropDown();
  fillPage();
  equipSendMessage();
}

function equipDropDown() {
  const dropDowns = [...$(".dropDownIcon")];
  dropDowns.forEach(e => {
    e.addEventListener("click", function() {
      this.parentElement.parentElement.querySelectorAll(".dependant")
      .forEach(ea => {
        ea.classList.toggle("EAL_noShow");
      });
      switch (this.innerText) {
        case "►":
          this.innerText = "▼";
          break;
        case "▼":
          this.innerText = "►";
      }
    });
  });
}

async function fillPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const dbURL = "https://6d8p0b063a.execute-api.us-west-1.amazonaws.com/default/lovedMessageLogic";
  const idInfo = await fetch(dbURL, {
    method: "POST",
    body: JSON.stringify({
      purpose: "May I have the related info please?",
      id: id
    })
  }).then(res => res.json());
  [...$(".targetName")].forEach(e => e.innerText = idInfo["reciever"]);
  [...$(".senderName")].forEach(e => e.innerText = idInfo["sender"]);
  $(".messageContainer p")[0].innerText = idInfo["message"];
}

function equipSendMessage() {
  $("#sendMessage")[0].addEventListener("click", sendMessage);
}

async function sendMessage() {
  this.disabled = true;
  const dbURL = "https://6d8p0b063a.execute-api.us-west-1.amazonaws.com/default/lovedMessageLogic";
  const message = $("textarea")[0].value;
  const sender = $(".targetName")[0].innerText;
  const reciever = $("#toBeReciever")[0].value;
  const objToSend = {
    message: message,
    sender: sender,
    reciever: reciever,
    purpose: "I would like to create a new message!"
  }
  const idObj = await fetch(dbURL, {
    method: "POST",
    body: JSON.stringify(objToSend)
  }).then(r => r.json());
  console.log(idObj);
  $("textarea")[0].value = "";
  $("#toBeReciever")[0].value = "";
  createCopyableLink(idObj["id"]);
  this.disabled = false;
}

function createCopyableLink(anId) {
  const inputEle = document.createElement("input");
  inputEle.type = "text";
  inputEle.readOnly = true;
  inputEle.value = "https://ezesco.com/lovedMessage/index.html?id="+anId;
  inputEle.style.cssText = `
    width: 100%;
    background-color: var(--c1);
  `;
  $(".outroContainer")[0].appendChild(inputEle);
  inputEle.addEventListener("click", function(){
    this.select();
    document.execCommand("copy");
    alert("Link Coppied!");
  });
}

function $(aStr) {
  return document.querySelectorAll(aStr);
}

window.addEventListener("load", main);
