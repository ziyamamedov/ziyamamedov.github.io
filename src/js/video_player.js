const player = document.querySelector('#chocco-player');
const video = player.querySelector('#choccoVideo');
const controls = player.querySelector('.player__controls')

const playBtn = player.querySelector('[data-vector = play]');
const pauseBtn = player.querySelector('[data-vector = pause]');
const volumeBtn = player.querySelector('[data-vector = mute]');

const volumeBar = player.querySelector('#volume');
const volumeFilled = player.querySelector('.volume-filled');

const durBar = player.querySelector('#duration');
const durFilled = player.querySelector('.duration-filled')
const durDisplay = player.querySelector('.player__controls-dur');

const currTimeDisplay = player.querySelector('.player__controls-curr-time');


//Initial set
//initial volume st
setVolume(5);

//Set Set the duration display
function initialVideoSet() {
  console.log(video.readyState);
  
  var dur = Math.round(video.duration);
  var durMin = `${parseInt((dur / 60), 10)}`;
  var durSec = dur % 60;
  
  durSec = durSec < 10 ? `0${durSec}` : `${durSec}`;

  durDisplay.textContent = durMin + ':' + durSec;

  
  durBar.max = dur;
  setDurationBar(0);
}

//Этот интервал устанавливает начальные настройки видео
//Так как стандартное событие onloadedmetadata не всегда срабатыват
let videoTimer = setInterval( ()=>{    
    initialVideoSet();
    
    clearInterval(videoTimer);
},300)

// Set the current time display
video.addEventListener('play', ()=> {
  setInterval(() => {
    var cur = Math.round(video.currentTime);
    var curMin = `${parseInt((cur / 60), 10)}`;
    var curSec = cur % 60;
  
    curSec = curSec < 10 ? `0${curSec}` : `${curSec}`;

    currTimeDisplay.textContent = curMin + ':' + curSec;
    
    setDurationBar(cur, true);

  }, 1000);
});
  

function setVolume(value) {
  if(value != undefined) volumeBar.value = value;
  
  video.volume = volumeBar.value / 10;
  volumeFilled.style.width = volumeBar.value * 10 + '%';
}

function setDurationBar(value, ifCurTimeSet = false) {
  if(value != undefined) { durBar.value = value; }
  
  if(!ifCurTimeSet) video.currentTime = durBar.value;
  
  durFilled.style.width =  `${durBar.value / durBar.max * 100}%`;
}

function play() {
  video.play();
  player.classList.add('player--active');
}

function pause() {
  video.pause();
  player.classList.remove('player--active');
  player.classList.add('player--paused');
}

function mute(value = 5) {
  if(video.muted) {
    video.muted = false;
    volumeBtn.classList.remove('muted');
    setVolume (value);
  } else {
    video.muted = true;
    volumeBtn.classList.add('muted');
    setVolume (0);
  }
}

function fullScreen() {
  if(player.classList.contains('player--fullscreen')) {
    player.classList.remove('player--fullscreen');
    DISABLE_ONE_PAGE_SCROLL = false; //отключает скролл когда видео на весь экран
  } else {
    player.classList.add('player--fullscreen');
    DISABLE_ONE_PAGE_SCROLL = true;
  }
}

var splash;
var button;

//Controls listener
player.addEventListener('click', (e) => {
  e.preventDefault();

  button = e.target.closest('[data-vector]');
  
  if(button) {
    if(button.dataset.vector == 'flscr_open' || button.dataset.vector == 'flscr_cls') {
      fullScreen();
    } else {
      var vector = button.dataset.vector;
      this[vector]();
    }
    
  }
  
  if(e.target.closest('.player__splash')) {
    play();
  }

  if(e.target == video) {
    pause();
  } 

  if(e.target.closest('.player__controls-dur-bar')){
    console.log(video.duration);
    console.log(video.currentTime);
  }
});

//Duration bar listener
durBar.addEventListener('input', () => {
  setDurationBar();
});

//Volume bar listener
volumeBar.addEventListener('input', (e)=>{
  if(video.muted) mute(volumeBar.value);
  if(volumeBar.value == 0) {mute(); return};
  setVolume();
})
// For older browsers
volumeBar.addEventListener('change', (e)=>{
  setVolume();
})

player.addEventListener('dblclick', (e) => {
  if(e.target.closest('.player__controls')) return;
  fullScreen();
})


