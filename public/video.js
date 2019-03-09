const btnBackward = document.getElementById("backward");
const btnExpand = document.getElementById("expand");
const btnMute = document.getElementById("mute");
const btnMuteIcon = document.getElementById("muteIcon");
const btnPlay = document.getElementById("play");
const btnPlayIcon = document.getElementById("playIcon");
const btnForward = document.getElementById("forward");
const btnReset = document.getElementById("reset");
const btnStop = document.getElementById("stop");
const progressBar = document.getElementById("progress-bar");
const progressBarFill = document.getElementById("progress-bar-fill");

function expandVideo() {
  if (video.requestFullscreen) {
    video.requestFullscreen();
  } else if (video.mozRequestFullScreen) {
    // Firefox
    video.mozRequestFullScreen();
  } else if (video.webkitRequestFullscreen) {
    // Chrome and Safari
    video.webkitRequestFullscreen();
  }
}

function moveBackward() {
  video.currentTime -= 5;
}

function moveForward() {
  video.currentTime += 5;
}

function muteVideo() {
  if (video.muted) {
    video.muted = false;

    btnMuteIcon.classList.remove("fa-volume-up");
    btnMuteIcon.classList.add("fa-volume-off");
  } else {
    video.muted = true;

    btnMuteIcon.classList.remove("fa-volume-off");
    btnMuteIcon.classList.add("fa-volume-up");
  }
}

function playPauseVideo() {
  if (video.paused) {
    playVideo();
  } else {
    pauseVideo();
  }
}
function playVideo() {
  video.play();

  btnPlayIcon.classList.remove("fa-play");
  btnPlayIcon.classList.add("fa-pause");
}
function pauseVideo() {
  video.pause();

  btnPlayIcon.classList.remove("fa-pause");
  btnPlayIcon.classList.add("fa-play");
}

function restartVideo() {
  video.currentTime = 0;
  video.play();

  btnPlay.removeAttribute("hidden");
  btnReset.setAttribute("hidden", "true");
}

function stopVideo() {
  video.pause();
  video.currentTime = 0;
  btnPlayIcon.classList.remove("fa-pause");
  btnPlayIcon.classList.add("fa-play");
}

function updateProgressBar() {
  let value = (100 / video.duration) * video.currentTime;

  progressBarFill.style.width = value + "%";
}

function endVideo() {
  btnPlay.setAttribute("hidden", "true");
  btnReset.removeAttribute("hidden");
}

btnBackward.addEventListener("click", moveBackward, false);
btnExpand.addEventListener("click", expandVideo, false);
btnMute.addEventListener("click", muteVideo, false);
btnPlay.addEventListener("click", playPauseVideo, false);
btnForward.addEventListener("click", moveForward, false);
btnReset.addEventListener("click", restartVideo, false);
btnStop.addEventListener("click", stopVideo, false);
video.addEventListener("ended", endVideo, false);
video.addEventListener("timeupdate", updateProgressBar, false);
