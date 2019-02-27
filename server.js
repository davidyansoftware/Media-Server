const fs = require("fs");
const mime = require("mime-types");
const path = require("path");
const express = require("express");
const app = express();

//TODO take this in as commandline argument
const DEFAULT_MEDIA_PATH = __dirname + "/sample";

const root = process.argv[2]
  ? path.resolve(process.argv[2])
  : DEFAULT_MEDIA_PATH;

//TODO maybe consolidate these functions
function getFiles(dir) {
  let files = [];
  let readDir = fs.readdirSync(root + dir);
  for (let file of readDir) {
    let path = dir + "/" + file;
    if (fs.statSync(root + path).isDirectory()) {
      files.push({ name: file, files: getFiles(path), icon: "far fa-folder" });
    } else {
      let mimeType = mime.lookup(file);
      if (!mimeType) continue;
      let type = mimeType.replace(/\/.*/, "");
      let icon = "";
      let onClick = "";
      if (type === "video") {
        icon = "fas fa-video";
        onClick = "videoPath";
      } else if (type === "image") {
        icon = "far fa-images";
        onClick = "imagePath";
      } else if (type === "audio") {
        icon = "far fa-file-audio";
        onClick = "audioPath";
      } else {
        continue;
      }
      files.push({
        name: file,
        path: path,
        mimeType: mimeType,
        icon: icon,
        onClick: onClick
      });
    }
  }
  return files;
}

function getHTML(files) {
  let html = "<ul>";
  for (let file of files) {
    // check if its a directory
    let icon = "<i class='" + file.icon + "'></i> ";
    if (file.files) {
      html += "<li>" + icon + file.name + "</li>";
      html += getHTML(file.files);
    } else {
      html +=
        "<li onclick=" +
        file.onClick +
        "('" +
        file.path +
        "')>" +
        icon +
        file.name +
        "</li>";
    }
  }
  html += "</ul>";
  return html;
}

let files = getFiles("");

const TEMPLATE = fs.readFileSync("./template.html", "utf-8");

app.get("/", function(req, res) {
  res.set("Content-Type", "text/html");
  res.send(TEMPLATE.replace("$MEDIALIST$", getHTML(files)));
});

app.get("/media/*?", function(req, res) {
  const path = root + "/" + req.params[0];
  const stat = fs.statSync(path);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize
      //"Content-Type": "video/mp4"
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      "Content-Length": fileSize
      //"Content-Type": "video/mp4"
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
});

app.use(express.static("public"));

app.listen(3000, function() {
  console.log("Listening on port 3000!");
});
