"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExtendedBorderPoints = void 0;
/**
 * Get the pixels that surround an ROI. The pixels include the top and left borders,
 * but extend the right and bottom one by one pixel.
 * This allows to compute the minimum bounding rectangle with the correct surface.
 * This method is only used to calculate minimalBoundRectangle and convexHull.
 *
 * @param mask - The ROI for which to get the extended border points.
 * @returns - The array of points.
 */
function getExtendedBorderPoints(mask) {
    const borderPoints = mask.getBorderPoints({
        allowCorners: true,
        innerBorders: false,
    });
    let result = [];
    for (let point of borderPoints) {
        result.push(point, { column: point.column + 1, row: point.row }, { column: point.column + 1, row: point.row + 1 }, { column: point.column, row: point.row + 1 });
    }
    return result;
}
exports.getExtendedBorderPoints = getExtendedBorderPoints;
//# sourceMappingURL=getExtendedBorderPoints.js.map