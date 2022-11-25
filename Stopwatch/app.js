const startButton = document.getElementById('start'),
      stopButton  = document.getElementById('stop'),
      resetButton = document.getElementById('reset'),
      minutes = document.getElementById('minutes'),
      seconds = document.getElementById('seconds'),
      miliseconds = document.getElementById('miliseconds');
var isRunning = false, curTime = 0;

startButton.addEventListener('click', () => {
    isRunning = true;
    stopButton.removeAttribute('disabled');
    startButton.setAttribute('disabled', true);
    resetButton.removeAttribute('disabled');
});

stopButton.addEventListener('click', () => {
    isRunning = false;
    startButton.removeAttribute('disabled');
    stopButton.setAttribute('disabled', true)
});

resetButton.addEventListener('click', () => {
    curTime = 0;
    [minutes, seconds, miliseconds].forEach(unit => unit.innerHTML = '00')
    if (isRunning == false) resetButton.setAttribute('disabled', true);
});

setInterval(() => {
    if(isRunning) curTime++;
    miliseconds.innerHTML = curTime % 100;
    seconds.innerHTML = Math.floor(curTime / 100 % 60);
    minutes.innerHTML = Math.floor(curTime / 100 / 60);

    [minutes, seconds, miliseconds].forEach(unit => {
        if (unit.innerHTML.length == 1) unit.innerHTML = '0' + unit.innerHTML;
    })
}, 10)