"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.split = void 0;
const Image_1 = require("../Image");
/**
 * Create an array of single-channel images based on a multi-channel image.
 *
 * @param image - The image with many channels.
 * @returns Array of single-channel images.
 */
function split(image) {
    const result = [];
    for (let c = 0; c < image.channels; c++) {
        const channel = Image_1.Image.createFrom(image, {
            colorModel: Image_1.ImageColorModel.GREY,
        });
        for (let i = 0; i < channel.size; i++) {
            channel.setValueByIndex(i, 0, image.getValueByIndex(i, c));
        }
        result.push(channel);
    }
    return result;
}
exports.split = split;
//# sourceMappingURL=split.js.map