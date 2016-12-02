var express = require('express');
var Jimp = require('jimp');
var concat = require('concat-stream');
var app = express();
var mode = process.env.IMAGE_MODE;

app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.post('/', function(req, res, next) {
    var chunks = [];

    req.on('data', function (data) {
        chunks.push(data);
    });

    req.on('end', function () {
        var buffer = Buffer.concat(chunks);
        Jimp.read(buffer).then(function (image) {
            console.log('Manipulating an image!');

            switch(mode) {
                case "1":
                    image.sepia().getBuffer(Jimp.MIME_PNG, function(err, editedBuffer) {
                        res.end(editedBuffer);
                    });
                    break;
                default:
                    image.greyscale().getBuffer(Jimp.MIME_PNG, function(err, editedBuffer) {
                        res.end(editedBuffer);
                    });
            }
        }).catch(function (err) {
            console.error('Error: ' + err);
        });
    });
});

var server = app.listen(9001, function() {
    console.log('Server running on mode ' + mode + ' listening on port 9001...');
});
