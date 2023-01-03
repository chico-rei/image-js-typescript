"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearBorder = void 0;
const borderIterator_1 = require("../utils/borderIterator");
const multipleFloodFill_1 = require("./multipleFloodFill");
/**
 * Set the pixels connected to the border of the mask to zero. You can chose to allow corner connection of not with the `allowCorners` option.
 *
 * @param mask - The mask to process.
 * @param options - Clear border options.
 * @returns The image with cleared borders.
 */
function clearBorder(mask, options = {}) {
    let { allowCorners = false, out } = options;
    return (0, multipleFloodFill_1.multipleFloodFill)(mask, {
        startPixels: (0, borderIterator_1.borderIterator)(mask),
        startPixelValue: 1,
        newPixelValue: 0,
        allowCorners,
        out,
    });
}
exports.clearBorder = clearBorder;
//# sourceMappingURL=clearBorder.js.map