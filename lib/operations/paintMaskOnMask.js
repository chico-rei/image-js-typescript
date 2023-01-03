"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paintMaskOnMask = void 0;
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Paint a mask onto an image and the given position and with the given color.
 *
 * @param image - Image on which to paint the mask.
 * @param mask - Mask to paint on the image.
 * @param options - Paint mask options.
 * @returns The painted image.
 */
function paintMaskOnMask(image, mask, options = {}) {
    const { origin = { row: 0, column: 0 }, value = 1 } = options;
    const { column, row } = origin;
    const result = (0, getOutputImage_1.maskToOutputMask)(image, options, { clone: true });
    for (let currentRow = Math.max(row, 0); currentRow < Math.min(mask.height + row, image.height); currentRow++) {
        for (let currentColumn = Math.max(column, 0); currentColumn < Math.min(mask.width + column, image.width); currentColumn++) {
            if (mask.getBit(currentColumn - column, currentRow - row)) {
                result.setBit(currentColumn, currentRow, value);
            }
        }
    }
    return result;
}
exports.paintMaskOnMask = paintMaskOnMask;
//# sourceMappingURL=paintMaskOnMask.js.map