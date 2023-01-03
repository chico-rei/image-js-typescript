"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMbrFromPoints = void 0;
const points_1 = require("../../utils/geometry/points");
const getAngle_1 = require("./getAngle");
const getMbrAngle_1 = require("./getMbrAngle");
/**
 * Get the four corners of the minimun bounding rectangle from a set of points defining a simple convex polygon.
 * https://www.researchgate.net/profile/Lennert_Den_Boer2/publication/303783472_A_Fast_Algorithm_for_Generating_a_Minimal_Bounding_Rectangle/links/5751a14108ae6807fafb2aa5.pdf
 *
 * @param points - Points from which to compute the MBR.
 * @returns The array of corners.
 */
function getMbrFromPoints(points) {
    if (points.length === 0) {
        return {
            corners: [],
            angle: 0,
            width: 0,
            height: 0,
            surface: 0,
            perimeter: 0,
        };
    }
    if (points.length === 1) {
        return {
            corners: [points[0], points[0], points[0], points[0]],
            perimeter: 0,
            surface: 0,
            angle: 0,
            width: 0,
            height: 0,
        };
    }
    let rotatedVertices = [];
    let minSurface = Number.POSITIVE_INFINITY;
    let minSurfaceAngle = 0;
    let mbr = [];
    for (let i = 0; i < points.length; i++) {
        let angle = (0, getAngle_1.getAngle)(points[i], points[(i + 1) % points.length]);
        rotatedVertices = (0, points_1.rotate)(-angle, points);
        // Rotate and translate so that this segment is at the bottom.
        let aX = rotatedVertices[i].column;
        let aY = rotatedVertices[i].row;
        let bX = rotatedVertices[(i + 1) % rotatedVertices.length].column;
        let bY = rotatedVertices[(i + 1) % rotatedVertices.length].row;
        let tUndefined = true;
        let tMin = 0;
        let tMax = 0;
        let maxWidth = 0;
        for (let point of rotatedVertices) {
            let cX = point.column;
            let cY = point.row;
            let t = (cX - aX) / (bX - aX);
            if (tUndefined) {
                tUndefined = false;
                tMin = t;
                tMax = t;
            }
            else {
                if (t < tMin)
                    tMin = t;
                if (t > tMax)
                    tMax = t;
            }
            let width = (-(bX - aX) * cY + bX * aY - bY * aX) / (bX - aX);
            if (Math.abs(width) > Math.abs(maxWidth)) {
                maxWidth = width;
            }
        }
        let minPoint = { column: aX + tMin * (bX - aX), row: aY };
        let maxPoint = { column: aX + tMax * (bX - aX), row: aY };
        let currentSurface = Math.abs(maxWidth * (tMin - tMax) * (bX - aX));
        if (currentSurface < minSurface) {
            minSurfaceAngle = angle;
            minSurface = currentSurface;
            mbr = [
                maxPoint,
                minPoint,
                { column: minPoint.column, row: minPoint.row - maxWidth },
                { column: maxPoint.column, row: maxPoint.row - maxWidth },
            ];
        }
    }
    const mbrRotated = (0, points_1.rotate)(minSurfaceAngle, mbr);
    const width = mbr[0].column - mbr[2].column;
    const height = mbr[0].row - mbr[2].row;
    const mbrAngle = (0, getMbrAngle_1.getMbrAngle)(mbrRotated);
    return {
        corners: mbrRotated,
        surface: minSurface,
        angle: mbrAngle,
        width,
        height,
        perimeter: 2 * width + 2 * height,
    };
}
exports.getMbrFromPoints = getMbrFromPoints;
//# sourceMappingURL=getMbrFromPoints.js.map