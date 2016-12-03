# Flags

There multiple flags you can set (as environment variables) when spinning up this server to determine what happens to an image when send to it.

The main environment variable is `IMAGE_MODE`. Below are possible values for `IMAGE_MODE`. There are some that allow more settings to be set from another environment variable called `IMAGE_SETTING_1`.

## Color Modes
* `SEPIA`: Adds a sepia effect to the image.
* `GREYSCALE`: Adds a greyscale effect to the image.
* `INVERT`: Inverts the colors of the image.
* `BRIGHTNESS`: Adjusts the brightness of the image.
    * `IMAGE_SETTING_1`: Set this from -1 to 1 to set how much brightness. Default is 0 (no change).
* `CONTRAST`: Adjusts the contrast of the image.
    * `IMAGE_SETTING_1`: Set this from -1 to 1 to set how much contrast. Default is 0 (no change).

# Other Modes
* `AUTOCROP`: Crops same-color borders from the image.
