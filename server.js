var express = require('express');
var request = require('request');
var Jimp = require('jimp');
var concat = require('concat-stream');
var app = express();
var mode = process.env.IMAGE_MODE;
var setting1 = process.env.IMAGE_SETTING_1;
var port = process.env.IMAGE_PORT || 9001;

app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.post('/', function(req, res, next) {
    var chunks = [];

    req.on('data', function(data) {
        chunks.push(data);
    });

    req.on('end', function() {
        var buffer = Buffer.concat(chunks);
        console.log("Buffer length: " + buffer.length);

        processData(buffer, function(result) {
            console.log("We hit the end! Let's send our result: " + result.length)
            res.end(result);
        });
    });
});

function processData(buffer, callback) {
    if (!mode) {
        callback(buffer);
        return;
    }

    request.post({
        url: "http://next:9001",
        body: buffer,
        encoding: null
    }, function(error, response, body) {
        console.log("We got POST response: " + body.length);

        Jimp.read(body).then(function(image) {
            switch(mode) {
                case "SEPIA":
                    image.sepia();
                    break;
                case "GREYSCALE":
                    image.greyscale();
                    break;
                case "INVERT":
                    image.invert();
                    break;
                case "DITHER":
                    image.dither565();
                    break;
                case "BRIGHTNESS":
                    image.brightness(setting1 ? parseFloat(setting1) : 0);
                    break;
                case "CONTRAST":
                    image.contrast(setting1 ? parseFloat(setting1) : 0);
                    break;
                case "AUTOCROP":
                    image.autocrop();
                    break;
                case "BLUR":
                    image.blur(setting1 ? parseInt(setting1) : 1);
                    break;
                case "ROTATE":
                    image.rotate(setting1 ? parseInt(setting1) : 0);
                    break;
                case "FLIP":
                    image.flip((setting1 == "H"), (setting1 == "V"));
                    break;
                default:
                    console.log("Default!");
                    break;
            }

            image.getBuffer(Jimp.MIME_PNG, function(err, buffer) {
                callback(buffer);
            });

        }).catch(function (err) {
            console.error('Error: ' + err);
        });
    });
}

var server = app.listen(port, function() {
    console.log('Server running on mode ' + mode + ' listening on port ' + port + '...');
});
