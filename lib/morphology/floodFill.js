"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floodFill = void 0;
const getIndex_1 = require("../utils/getIndex");
const multipleFloodFill_1 = require("./multipleFloodFill");
/**
 * Apply a flood fill algorithm to an image.
 *
 * @param mask - Mask to process.
 * @param options - Flood fill options.
 * @returns The filled mask.
 */
function floodFill(mask, options = {}) {
    let { origin = { row: 0, column: 0 }, allowCorners = false, out } = options;
    const startPixel = (0, getIndex_1.getIndex)(origin.column, origin.row, mask);
    return (0, multipleFloodFill_1.multipleFloodFill)(mask, {
        startPixels: [startPixel],
        allowCorners,
        out,
    });
}
exports.floodFill = floodFill;
//# sourceMappingURL=floodFill.js.map