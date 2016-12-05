#!/bin/bash

rm -f $3
curl --request POST --data-binary "@$2" $1 >> $3
echo "Image $2 has been transformed to image $3!"
