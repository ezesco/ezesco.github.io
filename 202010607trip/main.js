const $ = str => [...document.querySelectorAll(str)];
//Time Tools
const TT = {
  second: 1000,
  get minute() {return this.second * 60},
  get hour() {return this.minute * 60},
  get day() {return this.hour * 24},
  countDays(n) {
    return ~~(n / this.day)
  },
  countHours(n) {
    return ~~((n % this.day) / this.hour)
  },
  countMinutes(n) {
    return ~~((n % this.hour) / this.minute)
  },
  countSeconds(n) {
    return ~~((n % this.minute) / this.second)
  }
}

const main = function() {
  configureOutput()
}

function configureOutput() {
  const departureDate = new Date(2021, 05, 08, 15, 37);
  setInterval(() => {
    let currentDate = Date.now();
    const dateDifference = departureDate - currentDate;
    console.log(dateDifference);
    let timeString = "T-";
    const daysLeft = TT.countDays(dateDifference);
    const hoursLeft = TT.countHours(dateDifference);
    const minutesLeft = TT.countMinutes(dateDifference);
    const secondsLeft = TT.countSeconds(dateDifference);
    timeString += `${daysLeft}d ${hoursLeft}h ${minutesLeft}m ${secondsLeft}s! 😁`;
    if (dateDifference < 0)
      timeString = "🌟".repeat(~~(Math.random()*6) + 1);
    $("#countdownDisplay")[0].innerText = timeString;
  }, TT.second);
}

window.addEventListener("load", main);
