const DISPLAY = "inline-block";
const HIDE = "none";

const videoWrapper = document.getElementById("video-wrapper");
const video = document.getElementById("video");
const videoSource = document.getElementById("video-source");

const image = document.getElementById("image");

const audio = document.getElementById("audio");
const audioSource = document.getElementById("audio-source");

videoWrapper.style.display = DISPLAY;

window.onload = function() {
  fetch("/files")
    .then(res => res.json())
    .then(data => {
      sequenceTree(data);
      console.log(data);
      let mediaList = document.getElementById("media-list");
      mediaList.appendChild(getHTML(data));
    });
};

function sequenceTree(files, prevFile) {
  for (let file of files) {
    if (file.files) {
      prevFile = sequenceTree(file.files, prevFile);
    } else {
      file.prev = prevFile;
      if (prevFile) {
        prevFile.next = file;
      }
      prevFile = file;
    }
  }
  return prevFile;
}

function getHTML(files) {
  let ul = document.createElement("ul");
  for (let file of files) {
    let icon = document.createElement("i");
    let classes = file.icon.split(" ");
    for (let iconClass of classes) {
      icon.classList.add(iconClass);
    }
    let li = document.createElement("li");
    li.appendChild(icon);
    li.appendChild(document.createTextNode(file.name));
    if (file.files) {
      li.append(getHTML(file.files));
    } else {
      li.onclick = function() {
        handleClick(file);
      };
    }
    ul.appendChild(li);
  }
  return ul;
}

const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

let currFile;
function handleClick(file) {
  currFile = file;
  window[file.onClick](file.path);
  prevButton.style.display = file.prev ? DISPLAY : HIDE;
  nextButton.style.display = file.next ? DISPLAY : HIDE;
}
function next() {
  if (currFile.next) handleClick(currFile.next);
}
function prev() {
  if (currFile.prev) handleClick(currFile.prev);
}

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
