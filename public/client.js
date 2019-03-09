const DISPLAY = "inline-block";
const HIDE = "none";

const video = document.getElementById("video");
const videoSource = document.getElementById("video-source");

const image = document.getElementById("image");

const audio = document.getElementById("audio");
const audioSource = document.getElementById("audio-source");

video.style.display = DISPLAY;

function videoPath(path) {
  video.style.display = DISPLAY;
  image.style.display = HIDE;
  audio.style.display = HIDE;
  video.pause();
  audio.pause();
  videoSource.setAttribute("src", "media" + path);
  video.load();
  video.play();
}

function imagePath(path) {
  video.style.display = HIDE;
  image.style.display = DISPLAY;
  audio.style.display = HIDE;
  video.pause();
  audio.pause();
  image.setAttribute("src", "media" + path);
}

function audioPath(path) {
  video.style.display = HIDE;
  image.style.display = HIDE;
  audio.style.display = DISPLAY;
  video.pause();
  audio.pause();
  audioSource.setAttribute("src", "media" + path);
  audio.load();
  audio.play();
}
