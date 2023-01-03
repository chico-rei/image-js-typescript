"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBlendedPixel = void 0;
const Image_1 = require("../Image");
const assert_1 = require("./assert");
const getDefaultColor_1 = require("./getDefaultColor");
/**
 * Blend the given pixel with the pixel at the specified location in the image.
 *
 * @param image - The image with which to blend.
 * @param column - Column of the target pixel.
 * @param row - Row of the target pixel.
 * @param options - Set blended pixel options.
 */
function setBlendedPixel(image, column, row, options = {}) {
    const { color = (0, getDefaultColor_1.getDefaultColor)(image) } = options;
    if (!image.alpha) {
        image.setPixel(column, row, color);
    }
    else {
        (0, assert_1.assert)(image instanceof Image_1.Image);
        const sourceAlpha = color[color.length - 1];
        if (sourceAlpha === image.maxValue) {
            image.setPixel(column, row, color);
            return;
        }
        const targetAlpha = image.getValue(column, row, image.channels - 1);
        let newAlpha = sourceAlpha + targetAlpha * (1 - sourceAlpha / image.maxValue);
        image.setValue(column, row, image.channels - 1, newAlpha);
        for (let component = 0; component < image.components; component++) {
            let sourceComponent = color[component];
            let targetComponent = image.getValue(column, row, component);
            let newComponent = (sourceComponent * sourceAlpha +
                targetComponent * targetAlpha * (1 - sourceAlpha / image.maxValue)) /
                newAlpha;
            image.setValue(column, row, component, newComponent);
        }
    }
}
exports.setBlendedPixel = setBlendedPixel;
//# sourceMappingURL=setBlendedPixel.js.map