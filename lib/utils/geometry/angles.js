"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.angle = exports.toDegrees = void 0;
const points_1 = require("./points");
/**
 * Convert radians to degrees
 *
 * @param radians - Angle in radians.
 * @returns  Angle in degrees.
 */
function toDegrees(radians) {
    return (radians * 180) / Math.PI;
}
exports.toDegrees = toDegrees;
/**
 * Returns the angle between 3 points. The first one is the point where the angle is.
 *
 * @param origin - Origin where the angle has to be measured.
 * @param p1 - First point.
 * @param p2 - Second point.
 * @returns The angle in radians.
 */
function angle(origin, p1, p2) {
    let v1 = (0, points_1.normalize)((0, points_1.difference)(p1, origin));
    let v2 = (0, points_1.normalize)((0, points_1.difference)(p2, origin));
    let dotProduct = (0, points_1.dot)(v1, v2);
    // TODO this code is not correct because it may return the opposite angle
    return Math.acos(dotProduct);
}
exports.angle = angle;
//# sourceMappingURL=angles.js.map