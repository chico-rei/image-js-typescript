"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConvexHull = void 0;
const polygons_1 = require("../utils/geometry/polygons");
const getExtendedBorderPoints_1 = require("./utils/getExtendedBorderPoints");
const monotoneChainConvexHull_1 = require("./utils/monotoneChainConvexHull");
/**
 * Get the vertices of the convex Hull polygon of a mask.
 *
 * @param mask - Mask to process.
 * @returns Array of the vertices of the convex Hull in clockwise order.
 */
function getConvexHull(mask) {
    const borderPoints = (0, getExtendedBorderPoints_1.getExtendedBorderPoints)(mask);
    if (borderPoints.length === 0) {
        return {
            points: [],
            surface: 0,
            perimeter: 0,
        };
    }
    const points = (0, monotoneChainConvexHull_1.monotoneChainConvexHull)(borderPoints);
    const perimeter = (0, polygons_1.getPolygonPerimeter)(points);
    const surface = (0, polygons_1.getPolygonArea)(points);
    return { points, perimeter, surface };
}
exports.getConvexHull = getConvexHull;
//# sourceMappingURL=getConvexHull.js.map