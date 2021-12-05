const $ = (str, dom = document) => [...dom.querySelectorAll(str)];
const url = "https://ezesco.com/encrypt/index.html";

(function checkForUrlMessage() {
  const urlParams = new URLSearchParams(window.location.search);
  const txt = urlParams.get('txt');
  if (!txt) return;
  $("#decrypt")[0].checked = true;
  $("textarea")[0].value = txt;
})();

const methods = {
  encrypt: function(txt, key) {
    return CryptoJS.AES.encrypt(txt, key).toString();
  },
  decrypt: function(txt, key) {
    const bytes  = CryptoJS.AES.decrypt(txt, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
}

let devil = true;
const emoji = $(".app > div")[0];
emoji.addEventListener("click", () => {
  emoji.innerText = devil ? "👼" : "😈";
  devil = !devil;
});

function runEncrypt() {
  const txt = $("textarea")[0].value;
  const key = $("input[name='hashCode']")[0].value;
  const radios = $("input[type='radio']");
  const checked = radios.find(e => e.checked);
  const notChecked = radios.find(e => !e.checked);
  const method = checked.value;
  const res = methods[method](txt, key);
  $("textarea")[0].value = res;

  checked.checked = false;
  notChecked.checked = true;
}

$("button[name='submit']")[0].addEventListener("click", runEncrypt);

$("button[name='link']")[0].addEventListener("click", () => {
  if (!navigator.clipboard) return console.error("No clipboard access... sry 😢");
  const encryptEle = $("#encrypt")[0];
  if (!encryptEle.checked) return console.error("Can only generate link when encrypting");
  runEncrypt();
  const txt = $("textarea")[0].value;
  const link = url + "?txt=" + txt;
  navigator.clipboard.writeText(link).then(() => {
    alert("coppied link to clipboard");
  });
});
