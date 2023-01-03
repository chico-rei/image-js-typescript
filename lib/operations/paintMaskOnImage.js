"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paintMaskOnImage = void 0;
const getDefaultColor_1 = require("../utils/getDefaultColor");
const getOutputImage_1 = require("../utils/getOutputImage");
const setBlendedPixel_1 = require("../utils/setBlendedPixel");
/**
 * Paint a mask onto an image and the given position and with the given color.
 *
 * @param image - Image on which to paint the mask.
 * @param mask - Mask to paint on the image.
 * @param options - Paint mask options.
 * @returns The painted image.
 */
function paintMaskOnImage(image, mask, options = {}) {
    const { origin = { row: 0, column: 0 }, color = (0, getDefaultColor_1.getDefaultColor)(image), blend = true, } = options;
    const { column, row } = origin;
    if (color.length !== image.channels) {
        throw new Error('paintMask: the given color is not compatible with the image');
    }
    const result = (0, getOutputImage_1.getOutputImage)(image, options, { clone: true });
    if (blend) {
        checkColorIsNumberArray(color);
        for (let currentRow = Math.max(row, 0); currentRow < Math.min(mask.height + row, image.height); currentRow++) {
            for (let currentColumn = Math.max(column, 0); currentColumn < Math.min(mask.width + column, image.width); currentColumn++) {
                if (mask.getBit(currentColumn - column, currentRow - row)) {
                    (0, setBlendedPixel_1.setBlendedPixel)(result, currentColumn, currentRow, {
                        color,
                    });
                }
            }
        }
    }
    else {
        for (let currentRow = Math.max(row, 0); currentRow < Math.min(mask.height + row, image.height); currentRow++) {
            for (let currentColumn = Math.max(column, 0); currentColumn < Math.min(mask.width + column, image.width); currentColumn++) {
                if (mask.getBit(currentColumn - column, currentRow - row)) {
                    for (let channel = 0; channel < image.channels; channel++) {
                        const currentValue = color[channel];
                        if (typeof currentValue === 'number') {
                            result.setValue(currentColumn, currentRow, channel, currentValue);
                        }
                    }
                }
            }
        }
    }
    return result;
}
exports.paintMaskOnImage = paintMaskOnImage;
function checkColorIsNumberArray(color) {
    for (let channel of color) {
        if (typeof channel !== 'number') {
            throw new Error('paintMask: cannot have null channels in color if blend is true');
        }
    }
}
//# sourceMappingURL=paintMaskOnImage.js.map