"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMbr = void 0;
const getExtendedBorderPoints_1 = require("./utils/getExtendedBorderPoints");
const getMbrFromPoints_1 = require("./utils/getMbrFromPoints");
const monotoneChainConvexHull_1 = require("./utils/monotoneChainConvexHull");
/**
 * Get the four corners of the minimun bounding rectangle of an ROI.
 *
 * @param mask - The ROI to process.
 * @returns The array of corners.
 */
function getMbr(mask) {
    const vertices = (0, monotoneChainConvexHull_1.monotoneChainConvexHull)((0, getExtendedBorderPoints_1.getExtendedBorderPoints)(mask));
    return (0, getMbrFromPoints_1.getMbrFromPoints)(vertices);
}
exports.getMbr = getMbr;
//# sourceMappingURL=getMbr.js.map