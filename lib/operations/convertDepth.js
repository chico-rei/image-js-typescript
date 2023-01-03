"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertDepth = void 0;
const Image_1 = require("../Image");
/**
 * Convert the color depth of an image.
 *
 * @param image - Image to convert.
 * @param newDepth - Depth to convert to.
 * @returns Converted image.
 */
function convertDepth(image, newDepth) {
    if (image.depth === newDepth) {
        throw new Error('convertDepth: cannot convert image to same depth');
    }
    if (newDepth === Image_1.ColorDepth.UINT16) {
        return convertToUint16(image);
    }
    else {
        return convertToUint8(image);
    }
}
exports.convertDepth = convertDepth;
/**
 * Convert image depth to 16 bits.
 *
 * @param image - Image to convert.
 * @returns Converted image.
 */
function convertToUint16(image) {
    const newImage = new Image_1.Image(image.width, image.height, {
        depth: Image_1.ColorDepth.UINT16,
        colorModel: image.colorModel,
        origin: image.origin,
    });
    for (let i = 0; i < image.size; i++) {
        for (let j = 0; j < newImage.channels; j++) {
            newImage.setValueByIndex(i, j, image.getValueByIndex(i, j) << 8);
        }
    }
    return newImage;
}
/**
 * Convert image depth to 8 bits.
 *
 * @param image - Image to convert.
 * @returns Converted image.
 */
function convertToUint8(image) {
    const newImage = new Image_1.Image(image.width, image.height, {
        depth: Image_1.ColorDepth.UINT8,
        colorModel: image.colorModel,
        origin: image.origin,
    });
    for (let i = 0; i < image.size; i++) {
        for (let j = 0; j < newImage.channels; j++) {
            newImage.setValueByIndex(i, j, image.getValueByIndex(i, j) >> 8);
        }
    }
    return newImage;
}
//# sourceMappingURL=convertDepth.js.map