"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arrayPointsToObjects = void 0;
/**
 * Convert object points into array points.
 *
 * @param points - Array of points as objects.
 * @returns Array of points as arrays
 */
function arrayPointsToObjects(points) {
    let result = [];
    for (let point of points) {
        result.push([point.column, point.row]);
    }
    return result;
}
exports.arrayPointsToObjects = arrayPointsToObjects;
//# sourceMappingURL=arrayPointsToObjects.js.map