"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAngle = void 0;
const points_1 = require("../../utils/geometry/points");
/**
 * The angle in radians of a vector relatively to the x axis.
 * The angle is positive in the cloxkwise direction.
 * This is an optimized version because it assumes that one of
 * the points is on the line y = 0.
 *
 * @param p1 - First point.
 * @param p2 - Second point.
 * @returns Rotation angle in radians to make the line horizontal.
 */
function getAngle(p1, p2) {
    let diff = (0, points_1.difference)(p2, p1);
    let vector = (0, points_1.normalize)(diff);
    let angle = Math.acos(vector.column);
    if (vector.row < 0)
        return -angle;
    return angle;
}
exports.getAngle = getAngle;
//# sourceMappingURL=getAngle.js.map