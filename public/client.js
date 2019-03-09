const DISPLAY = "inline-block";
const HIDE = "none";

const videoWrapper = document.getElementById("video-wrapper");
const video = document.getElementById("video");
const videoSource = document.getElementById("video-source");

const image = document.getElementById("image");

const audio = document.getElementById("audio");
const audioSource = document.getElementById("audio-source");

videoWrapper.style.display = DISPLAY;

function videoPath(path) {
  videoWrapper.style.display = DISPLAY;
  image.style.display = HIDE;
  audio.style.display = HIDE;
  pauseVideo();
  audio.pause();
  videoSource.setAttribute("src", "media" + path);
  video.load();
  playVideo();
}

function imagePath(path) {
  videoWrapper.style.display = HIDE;
  image.style.display = DISPLAY;
  audio.style.display = HIDE;
  pauseVideo();
  audio.pause();
  image.setAttribute("src", "media" + path);
}

function audioPath(path) {
  videoWrapper.style.display = HIDE;
  image.style.display = HIDE;
  audio.style.display = DISPLAY;
  pauseVideo();
  audio.pause();
  audioSource.setAttribute("src", "media" + path);
  audio.load();
  audio.play();
}
