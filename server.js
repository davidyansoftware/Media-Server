const fs = require("fs");
const mime = require("mime-types");
const path = require("path");
const express = require("express");
const app = express();

const DEFAULT_MEDIA_PATH = __dirname + "/sample";
const root = process.argv[2]
  ? path.resolve(process.argv[2])
  : DEFAULT_MEDIA_PATH;

const TYPE_PARAMS = {
  video: {
    icon: "fas fa-video",
    onClick: "videoPath"
  },
  image: {
    icon: "far fa-images",
    onClick: "imagePath"
  },
  audio: {
    icon: "far fa-file-audio",
    onClick: "audioPath"
  }
};

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
      let typeParam = TYPE_PARAMS[type];
      if (!typeParam) continue;

      files.push({
        name: file,
        path: path,
        mimeType: mimeType,
        icon: typeParam.icon,
        onClick: typeParam.onClick
      });
    }
  }
  return files;
}

const files = getFiles("");
const FILES_JSON = JSON.stringify(files);

const INDEX = fs.readFileSync("./public/index.html", "utf-8");

app.get("/", function(req, res) {
  res.set("Content-Type", "text/html");
  res.send(INDEX);
});

app.get("/files", function(req, res) {
  res.setHeader("Content-Type", "application/json");
  res.send(FILES_JSON);
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
