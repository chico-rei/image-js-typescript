"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resize = void 0;
const Image_1 = require("../Image");
const clamp_1 = require("../utils/clamp");
const interpolateBorder_1 = require("../utils/interpolateBorder");
const interpolatePixel_1 = require("../utils/interpolatePixel");
/**
 * Returns a resized copy of an image.
 *
 * @param image - Original image.
 * @param options - Resize options.
 * @returns The new image.
 */
function resize(image, options) {
    const { interpolationType = interpolatePixel_1.InterpolationType.BILINEAR, borderType = interpolateBorder_1.BorderType.CONSTANT, borderValue = 0, } = options;
    const { width, height } = checkOptions(image, options);
    const newImage = Image_1.Image.createFrom(image, { width, height });
    const interpolate = (0, interpolatePixel_1.getInterpolationFunction)(interpolationType);
    const interpolateBorder = (0, interpolateBorder_1.getBorderInterpolation)(borderType, borderValue);
    const clamp = (0, clamp_1.getClamp)(newImage);
    const intervalX = (image.width - 1) / (width - 1);
    const intervalY = (image.height - 1) / (height - 1);
    for (let row = 0; row < newImage.height; row++) {
        for (let column = 0; column < newImage.width; column++) {
            const nx = column * intervalX;
            const ny = row * intervalY;
            for (let channel = 0; channel < newImage.channels; channel++) {
                const newValue = interpolate(image, nx, ny, channel, interpolateBorder, clamp);
                newImage.setValue(column, row, channel, newValue);
            }
        }
    }
    return newImage;
}
exports.resize = resize;
/**
 * Verify that the resize options are valid.
 *
 * @param image - Image.
 * @param options - Resize options.
 * @returns Resize options.
 */
function checkOptions(image, options) {
    const { width, height, xFactor, yFactor, preserveAspectRatio = true, } = options;
    if (width === undefined &&
        height === undefined &&
        xFactor === undefined &&
        yFactor === undefined) {
        throw new Error('At least one of the width, height, xFactor or yFactor options must be passed');
    }
    let newWidth;
    let newHeight;
    const maybeWidth = getSize(width, xFactor, image.width, preserveAspectRatio);
    const maybeHeight = getSize(height, yFactor, image.height, preserveAspectRatio);
    if (maybeWidth === undefined) {
        if (maybeHeight !== undefined) {
            newWidth = Math.round(maybeHeight * (image.width / image.height));
        }
        else {
            throw new Error('UNREACHABLE');
        }
    }
    else {
        newWidth = maybeWidth;
    }
    if (maybeHeight === undefined) {
        if (maybeWidth !== undefined) {
            newHeight = Math.round(maybeWidth * (image.height / image.width));
        }
        else {
            throw new Error('UNREACHABLE');
        }
    }
    else {
        newHeight = maybeHeight;
    }
    return {
        width: newWidth,
        height: newHeight,
        xFactor: xFactor ?? newWidth / image.width,
        yFactor: yFactor ?? newHeight / image.height,
    };
}
/**
 * Compute automatic new size.
 *
 * @param sizeOpt - Size option.
 * @param factor - Factor option.
 * @param sizeImg - Size of the image.
 * @param preserveAspectRatio - Whether to preserve the aspect ratio.
 * @returns New size.
 */
function getSize(sizeOpt, factor, sizeImg, preserveAspectRatio) {
    if (sizeOpt === undefined) {
        if (factor !== undefined) {
            return Math.round(sizeImg * factor);
        }
        else if (!preserveAspectRatio) {
            return sizeImg;
        }
    }
    else if (factor !== undefined) {
        throw new Error('factor and size cannot be passed together');
    }
    else {
        return sizeOpt;
    }
    return undefined;
}
//# sourceMappingURL=resize.js.map