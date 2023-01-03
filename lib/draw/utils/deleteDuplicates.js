"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDuplicates = void 0;
/**
 * Remove duplicate points from array.
 *
 * @param points - Polygon points array.
 * @returns Cleaned polygon points array.
 */
function deleteDuplicates(points) {
    const finalPoints = [];
    for (let i = 0; i < points.length; i++) {
        if (points[i].column === points[(i + 1) % points.length].column &&
            points[i].row === points[(i + 1) % points.length].row) {
            continue;
        }
        else {
            finalPoints.push(points[i]);
        }
    }
    return finalPoints;
}
exports.deleteDuplicates = deleteDuplicates;
//# sourceMappingURL=deleteDuplicates.js.map