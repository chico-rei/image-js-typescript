"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertBinaryToGrey = exports.copyAlpha = exports.convertColor = void 0;
const Image_1 = require("../Image");
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Convert image to a different color model.
 *
 * @param image - Image to convert.
 * @param colorModel - New color model.
 * @param options - Convert color options.
 * @returns The converted image.
 */
function convertColor(image, colorModel, options = {}) {
    const canConvert = new Map([
        [
            Image_1.ImageColorModel.GREY,
            [Image_1.ImageColorModel.GREYA, Image_1.ImageColorModel.RGB, Image_1.ImageColorModel.RGBA],
        ],
        [
            Image_1.ImageColorModel.GREYA,
            [Image_1.ImageColorModel.GREY, Image_1.ImageColorModel.RGB, Image_1.ImageColorModel.RGBA],
        ],
        [
            Image_1.ImageColorModel.RGB,
            [Image_1.ImageColorModel.GREYA, Image_1.ImageColorModel.GREY, Image_1.ImageColorModel.RGBA],
        ],
        [
            Image_1.ImageColorModel.RGBA,
            [Image_1.ImageColorModel.GREYA, Image_1.ImageColorModel.GREY, Image_1.ImageColorModel.RGB],
        ],
        [Image_1.ImageColorModel.BINARY, [Image_1.ImageColorModel.GREY]],
    ]);
    if (image.colorModel === colorModel) {
        throw new Error(`Cannot convert color, image is already ${colorModel}`);
    }
    const canConvertTo = canConvert.get(image.colorModel);
    if (!canConvertTo || !canConvertTo.includes(colorModel)) {
        throw new Error(`conversion from ${image.colorModel} to ${colorModel} not implemented`);
    }
    if (image instanceof Image_1.Image) {
        const output = (0, getOutputImage_1.getOutputImage)(image, options, {
            newParameters: { colorModel },
        });
        if (image.colorModel === Image_1.ImageColorModel.GREY ||
            image.colorModel === Image_1.ImageColorModel.GREYA) {
            convertGreyToAny(image, output);
        }
        if (image.colorModel === Image_1.ImageColorModel.RGB ||
            image.colorModel === Image_1.ImageColorModel.RGBA) {
            if (colorModel === Image_1.ImageColorModel.RGB ||
                colorModel === Image_1.ImageColorModel.RGBA) {
                convertRgbToRgb(image, output);
            }
            else {
                // GREYA or GREY
                convertRgbToGrey(image, output);
            }
        }
        if (!image.alpha && output.alpha) {
            output.fillAlpha(output.maxValue);
        }
        if (image.alpha && output.alpha) {
            copyAlpha(image, output);
        }
        return output;
    }
    else {
        const output = (0, getOutputImage_1.maskToOutputImage)(image, options);
        convertBinaryToGrey(image, output);
        return output;
    }
}
exports.convertColor = convertColor;
/**
 * Copy alpha channel of source to dest.
 *
 * @param source - Source image.
 * @param dest - Destination image.
 */
function copyAlpha(source, dest) {
    if (source.size !== dest.size) {
        throw new Error('source and destination have different sizes');
    }
    if (!source.alpha) {
        throw new Error('source image does not have alpha');
    }
    if (!dest.alpha) {
        throw new Error('destination does not have alpha');
    }
    for (let i = 0; i < dest.size; i++) {
        dest.setValueByIndex(i, dest.channels - 1, source.getValueByIndex(i, source.channels - 1));
    }
}
exports.copyAlpha = copyAlpha;
/**
 * Convert grey image to other color model.
 *
 * @param image - Image to convert.
 * @param newImage - Converted image.
 */
function convertGreyToAny(image, newImage) {
    for (let i = 0; i < image.size; i++) {
        for (let j = 0; j < newImage.components; j++) {
            newImage.setValueByIndex(i, j, image.getValueByIndex(i, 0));
        }
    }
}
/**
 * Convert RGB image to RGB. Allows to use convert with an RGB target whatever the image color model is.
 *
 * @param image - Image to convert.
 * @param newImage - Converted image.
 */
function convertRgbToRgb(image, newImage) {
    for (let i = 0; i < image.size; i++) {
        for (let j = 0; j < 3; j++) {
            newImage.setValueByIndex(i, j, image.getValueByIndex(i, j));
        }
    }
}
/**
 * Convert RGB image to GREY.
 *
 * @param image - Image to convert.
 * @param newImage - Converted image.
 */
function convertRgbToGrey(image, newImage) {
    for (let i = 0; i < image.size; i++) {
        const r = image.getValueByIndex(i, 0);
        const g = image.getValueByIndex(i, 1);
        const b = image.getValueByIndex(i, 2);
        newImage.setValueByIndex(i, 0, Math.round(0.299 * r + 0.587 * g + 0.114 * b));
    }
}
/**
 * Convert Mask to GREY.
 *
 * @param mask - Mask to convert.
 * @param newImage - Converted image.
 */
function convertBinaryToGrey(mask, newImage) {
    for (let i = 0; i < mask.size; i++) {
        newImage.setValueByIndex(i, 0, mask.getBitByIndex(i) ? newImage.maxValue : 0);
    }
}
exports.convertBinaryToGrey = convertBinaryToGrey;
//# sourceMappingURL=convertColor.js.map