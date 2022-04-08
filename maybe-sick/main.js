window.addEventListener("load", async function main () {
  const $ = (str, dom = document) => [...dom.querySelectorAll(str)];
  const wait = ms => new Promise(r => setTimeout(r, ms));

  (function wavyjs() {
    $(".wavy-js").forEach(el => {
      const txt = el.innerText;
      el.innerHTML = [...txt].map(s => `<span>${s}</span>`).join("");
      console.log(el.innerHTML);
    });
  })();
});
