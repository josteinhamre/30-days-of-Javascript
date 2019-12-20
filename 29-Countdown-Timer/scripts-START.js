let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

console.log(custom);

function displayTimeLeft(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  const display = `${min}:${sec > 9 ? '' : '0'}${sec}`;
  document.title = display;
  timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  endTime.textContent = `Timer ends at: ${hour}:${min > 9 ? '' : '0'}${min}:${
    sec > 9 ? '' : '0'
  }${sec}`;
}

function timer(seconds) {
  clearInterval(countdown);
  const then = Date.now() + seconds * 1000;
  displayTimeLeft(seconds);
  displayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
    } else {
      displayTimeLeft(Math.abs(secondsLeft));
    }
  }, 1000);
}

function startTimerButton(e) {
  timer(this.dataset.time);
}

function startTimerCustom(e) {
  e.preventDefault();
  timer(this[0].value * 60);
}

buttons.forEach(button => {
  button.addEventListener('click', startTimerButton);
});

document.customForm.addEventListener('submit', startTimerCustom);
