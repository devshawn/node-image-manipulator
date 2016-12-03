var express = require('express');
var Jimp = require('jimp');
var concat = require('concat-stream');
var app = express();
var mode = process.env.IMAGE_MODE;
var setting1 = process.env.IMAGE_SETTING_1;

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

            image.getBuffer(Jimp.MIME_PNG, function(err, editedBuffer) {
                res.end(editedBuffer);
            });
        }).catch(function (err) {
            console.error('Error: ' + err);
        });
    });
});

var server = app.listen(9001, function() {
    console.log('Server running on mode ' + mode + ' listening on port 9001...');
});
