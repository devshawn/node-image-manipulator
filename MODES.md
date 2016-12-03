# Modes

There multiple environemnt variables you can set when spinning up this server to determine what happens to an image when sent to it.

The main environment variable is `IMAGE_MODE`. Below are possible values for `IMAGE_MODE`. There are some that allow more settings to be set from another environment variable called `IMAGE_SETTING_1`.

## Color Modes
* `SEPIA`: Adds a sepia effect to the image.
* `GREYSCALE`: Adds a greyscale effect to the image.
* `INVERT`: Inverts the colors of the image.
* `DITHER`: Ordered dithering of the image and reduces the color space to 16-bits.
* `BRIGHTNESS`: Adjusts the brightness of the image.
    * `IMAGE_SETTING_1`: Set this from -1 to 1 to set how much brightness. Default is 0 (no change).
* `CONTRAST`: Adjusts the contrast of the image.
    * `IMAGE_SETTING_1`: Set this from -1 to 1 to set how much contrast. Default is 0 (no change).


## Other Modes
* `AUTOCROP`: Crops same-color borders from the image.
* `BLUR`: Blurs the image by a specified amount of pixels.
    * `IMAGE_SETTING_1`: Amount of pixels to blur by. Must be greater than 0. Default is 1.
* `ROTATE`: Rotates the image clockwise by a specified amount of degrees.
    * `IMAGE_SETTING_1`: Amount of degrees to rotate the image by. Default is 0 (no change).
* `FLIP`: Flips the image horizontally or vertically.
    * `IMAGE_SETTING_1`: Set to `H` for a horizontal flip or `V` for a vertical flip.
