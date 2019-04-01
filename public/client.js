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
      console.log(data);
      let mediaList = document.getElementById("media-list");
      mediaList.appendChild(getHTML(data));
    });
};

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
        window[file.onClick](file.path);
      };
    }
    ul.appendChild(li);
  }
  return ul;
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
