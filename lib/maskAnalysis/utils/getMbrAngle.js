"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMbrAngle = void 0;
const angles_1 = require("../../utils/geometry/angles");
const getAngle_1 = require("./getAngle");
const leftFirst = (mbrPoint1, mbrPoint2) => mbrPoint1.column <= mbrPoint2.column ? -1 : 1;
const topFirst = (mbrPoint1, mbrPoint2) => mbrPoint1.row >= mbrPoint2.row ? -1 : 1;
/**
 * Get the anti-clockwise angle in degrees between the MBR and a horizontal line.
 *
 * @param mbr - MBR to process.
 * @returns The angle in degrees.
 */
function getMbrAngle(mbr) {
    const sorted = mbr.slice().sort(leftFirst);
    const left = sorted.slice(0, 2);
    const right = sorted.slice(2, 4);
    left.sort(topFirst);
    right.sort(topFirst);
    const topLeft = left[0];
    const topRight = right[0];
    return -(0, angles_1.toDegrees)((0, getAngle_1.getAngle)(topLeft, topRight));
}
exports.getMbrAngle = getMbrAngle;
//# sourceMappingURL=getMbrAngle.js.map