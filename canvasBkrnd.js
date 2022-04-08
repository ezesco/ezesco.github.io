const myColorPalate = [
  "#ffe577",
  "#fec051",
  "#ff8967",
  "#fd6051",
  "#392033"
]
myColorPalate.__proto__.getColor = function() {
  return this[Math.floor(Math.random() * this.length)];
}

function canvasBkrnd_main() {
  const $ = (str, dom = document) => [...dom.querySelectorAll(str)];
  class Circle {
    constructor (
      x = 0,
      y = 0,
      rad = 10,
      color = "white"
    ) {
      this.x = x;
      this.y = y;
      this.radius = rad;
      this.color = color;
    }
    draw() {
      c.beginPath();
      c.arc(this.x, this.y, this.radius, 0, 2*Math.PI);
      c.fillStyle = this.color;
      c.fill();
    }
  }
  class Ripple extends Circle {
    constructor(x, y, color) {
      super(x, y, undefined, color);
      this.maxSize = 20;
      this.shrink = false;
      this.fluxRate = 5;
    }
    draw() {
      super.draw();
      // if (this.x > innerWidth / 2) {
      //   this.x *= 1.001;
      // } if (this.y > innerHeight / 2) {
      //   this.y *= 1.001;
      // }
      // if (this.x < innerWidth / 2) {
      //   this.x *= .999;
      // } if (this.y < innerHeight / 2) {
      //   this.y *= .999;
      // }
      if (this.shrink) {
        this.radius -= this.fluxRate * 0.4;
        return;
      }
      if (this.radius < this.maxSize) {
        this.radius += this.fluxRate * 0.2;
      } else {
        this.shrink = true;
      }
    }
    get timeToDelete() {
      return this.radius <= 0;
    }
  }
  const canvas = setUpCanvas();
  const c = canvas.getContext("2d");
  const cursor = new Circle();
  var ripples = [];
  animateCanvas();
  window.addEventListener("mousemove", updateCursorPos);
  window.addEventListener("wheel", randomizeCursorColor);
  window.addEventListener("click", createRipple);
  // recursiveThrottled(function(){createRipple({x: Math.floor(Math.random()*innerWidth), y: Math.floor(Math.random()*innerHeight)})}, 10);
  // recursiveThrottled(createRipple, 30);

  function setUpCanvas() {
    const canvas = document.createElement("canvas");
    $("body")[0].appendChild(canvas);
    canvas.style.cssText = `
      position: fixed;
      inset: 0;
      z-index: -1;
      background-color: rgb(60, 60, 110);
      cursor: none;
    `;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return canvas;

    function resizeCanvas() {
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    }
  }
  function animateCanvas() {
    requestAnimationFrame(animateCanvas);
    c.clearRect(0, 0, canvas.width, canvas.height);
    ripples.forEach((e, i) => {
      e.draw()
      if (e.timeToDelete) {
        delete ripples[i];
      }
    });
    cursor.draw();
  }
  function updateCursorPos(e) {
    cursor.x = e.x;
    cursor.y = e.y;
    createRipple();
  }
  function randomizeCursorColor() {
    cursor.color = myColorPalate.getColor();
  }
  function createRipple(e = {x: cursor.x, y: cursor.y}) {
    // const ripple = new Ripple(e.x, e.y, cursor.color);
    const ripple = new Ripple(e.x, e.y, myColorPalate.getColor());
    ripples.push(ripple);
  }
  async function recursiveThrottled(cb, throttle) {
    await new Promise(resolve => setTimeout(resolve, throttle));
    cb();
    recursiveThrottled(cb, throttle);
  }
}

window.addEventListener("load", canvasBkrnd_main);
