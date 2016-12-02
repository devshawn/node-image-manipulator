#!/bin/bash

rm node2.png
curl --request POST --data-binary "@node.png" http://localhost:9001/ >> node2.png
echo 'Image has been transformed!'
