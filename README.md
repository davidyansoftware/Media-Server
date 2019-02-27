# Media Server

A media server that can server media files local to server. Will handle audio, images, and video. The client will determine the correct player to display baseed on mime-type. Large files will be served in chunks to allow smooth streaming, and quick loading. Server will recursively traverse the provided directory to find all media files.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Installing

```
npm install
```

This will install all dependencies for this project:

Express - web framework for serving client to users

Mime-types - determines the media types for given files

### Usage

```
node server.js [path/to/media/directory]
```

If a media path is not provided, it will default to ./sample for demonstration purposes.

Now you can visit http://localhost:3000 to open a client to browse all media files. Click on a media file to start streaming, and display the correct media handler.
