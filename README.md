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

## File Tree

Files are stored in a tree data structure. Media files are leaves, and directories branch recursively traversed until all media files are discovered.

### Client-Side Rendering

The file tree is passed to the client as JSON, where it is rendered into the navigation bar. The files retain the tree structure here, and denote directories and files. Users can click on elements in this bar to access media files.

### Breadth First Sequencing

To handle simple next/previous traversal of these files, the tree is traveresed in a breadth first traversal so next/prev will direct to other media files in the directory, until there are no more files, at which point sub-directories and parent directories will be traversed.
