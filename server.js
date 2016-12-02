var express = require('express');
var jimp = require('jimp');
var concat = require('concat-stream');
var app = express();


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
        jimp.read(buffer, function (err, image) {
            image.greyscale().getBuffer(jimp.MIME_PNG, function(err, buffer2) {
                res.end(buffer2);
            });
        });
    });
});

var server = app.listen(9001, function() {
    console.log('Server listening on port 9001...');
});
