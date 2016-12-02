var express = require('express');
var Jimp = require('jimp');
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
        Jimp.read(buffer).then(function (image) {
            image.greyscale().getBuffer(Jimp.MIME_PNG, function(err, editedBuffer) {
                res.end(editedBuffer);
            });
        }).catch(function (err) {
            console.error(err);
        });
    });
});

var server = app.listen(9001, function() {
    console.log('Server listening on port 9001...');
});
