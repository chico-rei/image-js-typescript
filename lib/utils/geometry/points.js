"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dot = exports.rotate = exports.normalize = exports.difference = void 0;
/**
 * Calculates a new point that is the difference p1 - p2
 *
 * @param p1 - First point.
 * @param p2 - Second Point.
 * @returns Difference between the two points.
 */
function difference(p1, p2) {
    return { column: p1.column - p2.column, row: p1.row - p2.row };
}
exports.difference = difference;
/**
 * Normalize a point (more precisely the vector from the origin to the point).
 *
 * @param point - Point to normalize.
 * @returns - Normalized point.
 */
function normalize(point) {
    let length = Math.sqrt(point.column ** 2 + point.row ** 2);
    return { column: point.column / length, row: point.row / length };
}
exports.normalize = normalize;
/**
 * Rotate an array of points by an angle in radians.
 * The rotation is clockwise and the reference is (0,0).
 *
 * @param radians - Angle in radians.
 * @param points - Source points
 * @returns The points after rotation.
 */
function rotate(radians, points) {
    let result = [];
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    for (let point of points) {
        result.push({
            column: cos * point.column - sin * point.row,
            row: sin * point.column + cos * point.row,
        });
    }
    return result;
}
exports.rotate = rotate;
/**
 * Dot product of 2 points assuming vectors starting from (0,0).
 *
 * @param p1 - First point.
 * @param p2 - Second point.
 * @returns Dot product between the two vectors.
 */
function dot(p1, p2) {
    return p1.column * p2.column + p1.row * p2.row;
}
exports.dot = dot;
//# sourceMappingURL=points.js.map