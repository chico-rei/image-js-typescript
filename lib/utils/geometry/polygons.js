"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPolygonArea = exports.getPolygonPerimeter = void 0;
const lines_1 = require("./lines");
/**
 * Compute the perimeter of a polygon.
 *
 * @param points - Array of polygon vertices.
 * @returns The perimeter.
 */
function getPolygonPerimeter(points) {
    let perimeter = 0;
    for (let i = 0; i < points.length; i++) {
        perimeter += (0, lines_1.getLineLength)(points[(i + 1) % points.length], points[i]);
    }
    return perimeter;
}
exports.getPolygonPerimeter = getPolygonPerimeter;
/**
 * Compute the area of a polygon.
 * Based on the algorithm described on
 * https://web.archive.org/web/20100405070507/http://valis.cs.uiuc.edu/~sariel/research/CG/compgeom/msg00831.html
 *
 * @param points - Array of polygon vertices.
 * @returns The area.
 */
function getPolygonArea(points) {
    let area = 0;
    for (let current = 0; current < points.length; current++) {
        const next = (current + 1) % points.length;
        area += points[current].column * points[next].row;
        area -= points[current].row * points[next].column;
    }
    return Math.abs(area / 2);
}
exports.getPolygonArea = getPolygonArea;
//# sourceMappingURL=polygons.js.map