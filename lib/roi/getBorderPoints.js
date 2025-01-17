"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBorderPoints = void 0;
/**
 * Return an array with the coordinates of the pixels that are on the border of the ROI.
 * The reference is the top-left corner of the ROI.
 *
 * @param roi - ROI to process.
 * @param options - Get border points options.
 * @returns The array of border pixels.
 */
function getBorderPoints(roi, options = {}) {
    const mask = roi.getMask();
    return mask.getBorderPoints(options);
}
exports.getBorderPoints = getBorderPoints;
//# sourceMappingURL=getBorderPoints.js.map