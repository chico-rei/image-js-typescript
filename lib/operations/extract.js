"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extract = void 0;
const Image_1 = require("../Image");
const assert_1 = require("../utils/assert");
/**
 * Extract the pixels of an image, as specified in a mask.
 *
 * @param image - The image to process.
 * @param mask - The mask defining which pixels to keep.
 * @param options - Extract options.
 * @returns The extracted image.
 */
function extract(image, mask, options = {}) {
    const { origin = { row: 0, column: 0 } } = options;
    const { row, column } = origin;
    (0, assert_1.assert)(row < image.height &&
        column < image.width &&
        row + mask.width > 0 &&
        column + mask.height > 0, 'extract: image and mask have no overlap');
    const resultWidth = Math.min(image.width, mask.width + column) - Math.max(0, column);
    const resultHeight = Math.min(image.height, mask.height + row) - Math.max(0, row);
    let newImage = new Image_1.Image(resultWidth, resultHeight, {
        colorModel: image.colorModel,
        origin,
    });
    if (newImage.alpha) {
        newImage = newImage.fillAlpha(0);
    }
    const imageStartRow = Math.max(0, row);
    const imageStartColumn = Math.max(0, column);
    const maskStartRow = row < 0 ? -row : 0;
    const maskStartColumn = column < 0 ? -column : 0;
    for (let resultRow = 0; resultRow < resultHeight; resultRow++) {
        for (let resultColumn = 0; resultColumn < resultWidth; resultColumn++) {
            if (mask.getBit(maskStartColumn + resultColumn, maskStartRow + resultRow)) {
                newImage.setPixel(resultColumn, resultRow, image.getPixel(imageStartColumn + resultColumn, imageStartRow + resultRow));
            }
        }
    }
    return newImage;
}
exports.extract = extract;
//# sourceMappingURL=extract.js.map