# Node Image Manipulator

[![Dependency Status](https://david-dm.org/devshawn/node-image-manipulator/status.svg)](https://david-dm.org/devshawn/node-image-manipulator/status.svg)
<br />
 
A small node server which manipulates images it receives for use in a Docker demonstration.

## Standalone Server

### Setup

To start up the server, clone the repository and run the following command in the project's root directory:

```
node server.js
```

This will start up a server running on port `9001` on `localhost`.

### Usage

This server accepts an image as binary data as part of a `POST` request.

As an example, `node.png` is included in the root directory. To get and receive the same file, you can run the following command:

```
curl --request POST --data-binary "@node.png" http://localhost:9001/ >> node2.png
```

## Docker Server

### Build From Source

Clone the repository and run the following command in the project's root directory:

```
docker build -t node-image-manipulator .
```

This will build the image. You can now spin up a container:

```
docker run -d -p 9001:9001 node-image-manipulator
```

This will spin up a container running the web server on port `9001` on `localhost`.
