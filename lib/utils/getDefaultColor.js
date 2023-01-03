"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultColor = void 0;
const colorModels_1 = require("./constants/colorModels");
/**
 * Get the default color for a given color model.
 * The color is black for images and 1 for masks.
 *
 * @param image - The used image.
 * @returns Default color.
 */
function getDefaultColor(image) {
    switch (image.colorModel) {
        case colorModels_1.ImageColorModel.GREY:
            return [0];
        case colorModels_1.ImageColorModel.GREYA:
            return [0, image.maxValue];
        case colorModels_1.ImageColorModel.RGB:
            return [0, 0, 0];
        case colorModels_1.ImageColorModel.RGBA:
            return [0, 0, 0, image.maxValue];
        case colorModels_1.ImageColorModel.BINARY:
            return [1];
        default:
            throw new Error(`image color model ${image.colorModel} is not compatible`);
    }
}
exports.getDefaultColor = getDefaultColor;
//# sourceMappingURL=getDefaultColor.js.map