"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solidFill = void 0;
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Fill holes in regions of interest.
 *
 * @param mask - Mask to process.
 * @param options - Flood fill options.
 * @returns The filled mask.
 */
function solidFill(mask, options = {}) {
    let { allowCorners = false } = options;
    let newImage = (0, getOutputImage_1.maskToOutputMask)(mask, options, { clone: true });
    let inverted = mask.invert();
    let cleared = inverted.clearBorder({ allowCorners });
    return newImage.or(cleared, { out: newImage });
}
exports.solidFill = solidFill;
//# sourceMappingURL=solidFill.js.map