let countdown;
const timerDisplay = document.getElementById('pomodoro-time');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const pomodoroButton = document.getElementById('pomodoro');
const breakButton = document.getElementById('break');
let isPaused = false;
let currentMode = 'pomodoro';

function timer(seconds) {
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;

  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);

    if (secondsLeft < 0) {
      clearInterval(countdown);
      resetTimer();
      return;
    }

    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  const displaySeconds = remainderSeconds < 10 ? '0' + remainderSeconds : remainderSeconds;
  const display = `${displayMinutes}:${displaySeconds}`;
  timerDisplay.textContent = display;
}

function startTimer() {
  const seconds = isPaused ? parseInt(timerDisplay.textContent.split(':')[0]) * 60 + parseInt(timerDisplay.textContent.split(':')[1]) : (currentMode === 'pomodoro' ? 25 * 60 : 5 * 60);
  timer(seconds);
}

function resetTimer() {
  timerDisplay.textContent = currentMode === 'pomodoro' ? '25:00' : '05:00';
  startButton.textContent = 'Start';
  isPaused = false;
}

startButton.addEventListener('click', () => {
  if (startButton.textContent === 'Start') {
    startButton.textContent = 'Stop';
    startTimer();
  } else {
    clearInterval(countdown);
    startButton.textContent = 'Start';
    isPaused = true;
  }
});

resetButton.addEventListener('click', () => {
  clearInterval(countdown);
  resetTimer();
});

pomodoroButton.addEventListener('click', () => {
  currentMode = 'pomodoro';
  clearInterval(countdown);
  resetTimer();
  pomodoroButton.classList.remove('active');
});

breakButton.addEventListener('click', () => {
  currentMode = 'break';
  clearInterval(countdown);
  resetTimer();
  breakButton.classList.add('active');
});

resetTimer();