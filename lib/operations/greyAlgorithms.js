"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightness = exports.saturation = exports.hue = exports.yellow = exports.magenta = exports.cyan = exports.black = exports.blue = exports.green = exports.red = exports.minmax = exports.average = exports.min = exports.max = exports.luma601 = exports.luma709 = void 0;
/**
 * Converts R, G and B values to a single value using Luma 709 standard({@link https://en.wikipedia.org/wiki/Luma_(video)}).
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
function luma709(red, green, blue) {
    // sRGB
    // return red * 0.2126 + green * 0.7152 + blue * 0.0722;
    // Let's do a little trick ... in order not convert the integer to a double we do
    // the multiplication with integer to reach a total of 32768 and then shift the bits
    // of 15 to the right
    // This does a Math.floor and may lead to small (max 1) difference
    // Same result, > 10% faster on the full grey conversion
    return (red * 6966 + green * 23436 + blue * 2366) >> 15;
}
exports.luma709 = luma709;
/**
 *  Converts R, G and B values to a single value using Luma 601 standard({@link https://en.wikipedia.org/wiki/Luma_(video)}).
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
function luma601(red, green, blue) {
    // NTSC
    // return this.red * 0.299 + green * 0.587 + blue * 0.114;
    return (red * 9798 + green * 19235 + blue * 3735) >> 15;
}
exports.luma601 = luma601;
/**
 * Return the maximal value between red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
function max(red, green, blue) {
    return Math.max(red, green, blue);
}
exports.max = max;
/**
 * Return the minimal value between red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
function min(red, green, blue) {
    return Math.min(red, green, blue);
}
exports.min = min;
/**
 * Return the average of red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
function average(red, green, blue) {
    return ((red + green + blue) / 3) >> 0;
}
exports.average = average;
/**
 * Return the average between the max and min values of red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
function minmax(red, green, blue) {
    return (Math.max(red, green, blue) + Math.min(red, green, blue)) / 2;
}
exports.minmax = minmax;
/**
 * Return the red value.
 *
 * @param red - Red value of current pixel.
 * @returns - Corresponding gray value.
 */
function red(red) {
    return red;
}
exports.red = red;
/**
 * Return the green value.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @returns - Corresponding gray value.
 */
function green(red, green) {
    return green;
}
exports.green = green;
/**
 * Return the blue value.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @returns - Corresponding gray value.
 */
function blue(red, green, blue) {
    return blue;
}
exports.blue = blue;
/**
 * Return the minimum of the inverses of red, green and blue.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @param image - Image to convert to grey.
 * @returns - Corresponding gray value.
 */
function black(red, green, blue, image) {
    return Math.min(image.maxValue - red, image.maxValue - green, image.maxValue - blue);
}
exports.black = black;
/**
 * Returns the cyan component of a pixel.
 *
 * @param red - Red value of current pixel.
 * @param green - Green value of current pixel.
 * @param blue - Blue value of current pixel.
 * @param image - Image to convert to grey.
 * @returns - Corresponding gray value.
 */
function cyan(red, green, blue, image) {
    let blackColor = black(red, green, blue, image);
    return (((image.maxValue - red - blackColor) / (1 - blackColor / image.maxValue)) >>
        0);
}
exports.cyan = cyan;
/**
 * Returns the magenta component of a pixel.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @param image - Image to convert to grey.
 * @returns - Corresponding gray value.
 */
function magenta(red, green, blue, image) {
    let blackColor = black(red, green, blue, image);
    return (((image.maxValue - green - blackColor) /
        (1 - blackColor / image.maxValue)) >>
        0);
}
exports.magenta = magenta;
/**
 * Returns the yellow component of a pixel.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @param image - Image to convert to grey.
 * @returns - Corresponding gray value.
 */
function yellow(red, green, blue, image) {
    let blackColor = black(red, green, blue, image);
    return (((image.maxValue - blue - blackColor) /
        (1 - blackColor / image.maxValue)) >>
        0);
}
exports.yellow = yellow;
/**
 * Returns the hue of a pixel as a value between 0 and 255.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @param image - Source image for the RGB values.
 * @returns - Hue of the pixel.
 */
function hue(red, green, blue, image) {
    let minValue = min(red, green, blue);
    let maxValue = max(red, green, blue);
    if (maxValue === minValue) {
        return 0;
    }
    let hue = 0;
    let delta = maxValue - minValue;
    switch (maxValue) {
        case red:
            hue = (green - blue) / delta + (green < blue ? 6 : 0);
            break;
        case green:
            hue = (blue - red) / delta + 2;
            break;
        case blue:
            hue = (red - green) / delta + 4;
            break;
        default:
            throw new Error('unreachable');
    }
    return ((hue / 6) * image.maxValue) >> 0;
}
exports.hue = hue;
/**
 * Returns the saturation component of a pixel.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @param image - Source image for the RGB values.
 * @returns - Saturation of the pixel.
 */
function saturation(red, green, blue, image) {
    // from HSV model
    let minValue = min(red, green, blue);
    let maxValue = max(red, green, blue);
    let delta = maxValue - minValue;
    return maxValue === 0 ? 0 : (delta / maxValue) * image.maxValue;
}
exports.saturation = saturation;
/**
 * Returns the lightness of a pixel.
 *
 * @param red - Red value of current pixel
 * @param green - Green value of current pixel
 * @param blue - Blue value of current pixel
 * @returns - Lightness of the pixel
 */
function lightness(red, green, blue) {
    let minValue = min(red, green, blue);
    let maxValue = max(red, green, blue);
    return (maxValue + minValue) / 2;
}
exports.lightness = lightness;
//# sourceMappingURL=greyAlgorithms.js.map