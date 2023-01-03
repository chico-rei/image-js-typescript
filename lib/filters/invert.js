"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invert = void 0;
const __1 = require("..");
const Image_1 = require("../Image");
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Invert the components of an image.
 *
 * @param image - The image to invert.
 * @param options - Invert options.
 * @returns The inverted image.
 */
function invert(image, options) {
    if (image instanceof Image_1.Image) {
        const newImage = (0, getOutputImage_1.getOutputImage)(image, options);
        if (image.alpha) {
            (0, __1.copyAlpha)(image, newImage);
        }
        const { maxValue, size } = newImage;
        for (let i = 0; i < size; i++) {
            for (let component = 0; component < image.components; component++) {
                newImage.setValueByIndex(i, component, maxValue - image.getValueByIndex(i, component));
            }
        }
        return newImage;
    }
    else {
        const newImage = (0, getOutputImage_1.maskToOutputMask)(image, options);
        for (let i = 0; i < newImage.size; i++) {
            newImage.setBitByIndex(i, !image.getBitByIndex(i));
        }
        return newImage;
    }
}
exports.invert = invert;
//# sourceMappingURL=invert.js.map