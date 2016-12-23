import getTimeRemaining from './countdown';

const initializeClock = (minutes) => {
  document.getElementById('start').style.display = 'none';
  document.getElementById('stop').style.display = 'block';
  const endtime = Date.now() + (minutes * 60 * 1000); // number of miliseconds until countdown finishes
  const clock = document.getElementById('clockdiv');
  const timeinterval = setInterval(() => {
    const t = getTimeRemaining(endtime);
    const seconds = t.seconds < 10 ? '0' + t.seconds : t.seconds;
    const minutes = t.minutes < 10 ? '0' + t.minutes : t.minutes;
    clock.innerHTML = minutes + ':' + seconds;
    if (t.total < 1000) {
      clearInterval(timeinterval);
    }
  }, 1000);
  document.getElementById('stop').addEventListener('click', () => resetClock(10, timeinterval));
};

const resetClock = (minutes, timeinterval) => {
  clearInterval(timeinterval);
  document.getElementById('stop').style.display = 'none';
  document.getElementById('start').style.display = 'block';
  const clock = document.getElementById('clockdiv');
  clock.innerHTML = minutes + ':' + '00';
};

document.getElementById('start').addEventListener('click', () => initializeClock(10));
