"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeret = void 0;
const angles_1 = require("../utils/geometry/angles");
const points_1 = require("../utils/geometry/points");
const getAngle_1 = require("./utils/getAngle");
/**
 * Computes the Feret diameters
 * https://www.sympatec.com/en/particle-measurement/glossary/particle-shape/#
 * http://portal.s2nano.org:8282/files/TEM_protocol_NANoREG.pdf
 *
 * @param mask - The mask of the ROI.
 * @returns The Feret diameters.
 */
function getFeret(mask) {
    const hull = mask.getConvexHull();
    const originalPoints = hull.points;
    if (hull.surface === 0) {
        return {
            minDiameter: {
                length: 0,
                points: [
                    { column: 0, row: 0 },
                    { column: 0, row: 0 },
                ],
                angle: 0,
            },
            maxDiameter: {
                length: 0,
                points: [
                    { column: 0, row: 0 },
                    { column: 0, row: 0 },
                ],
                angle: 0,
            },
            aspectRatio: 1,
        };
    }
    // Compute minimum diameter
    let minWidth = Number.POSITIVE_INFINITY;
    let minWidthAngle = 0;
    let minLinePoints = [];
    for (let i = 0; i < originalPoints.length; i++) {
        let angle = (0, getAngle_1.getAngle)(originalPoints[i], originalPoints[(i + 1) % originalPoints.length]);
        // We rotate so that it is parallel to X axis.
        const temporaryPoints = (0, points_1.rotate)(-angle, originalPoints);
        let currentWidth = 0;
        let currentMinLinePoints = [];
        for (let j = 0; j < originalPoints.length; j++) {
            let absWidth = Math.abs(temporaryPoints[i].row - temporaryPoints[j].row);
            if (absWidth > currentWidth) {
                currentWidth = absWidth;
                currentMinLinePoints = [temporaryPoints[i], temporaryPoints[j]];
            }
        }
        if (currentWidth < minWidth) {
            minWidth = currentWidth;
            minWidthAngle = angle;
            minLinePoints = currentMinLinePoints;
        }
    }
    const minDiameter = {
        points: (0, points_1.rotate)(minWidthAngle, minLinePoints),
        length: minWidth,
        angle: (0, angles_1.toDegrees)(minWidthAngle),
    };
    // Compute maximum diameter
    let maxLinePoints = [];
    let maxSquaredWidth = 0;
    for (let i = 0; i < originalPoints.length - 1; i++) {
        for (let j = i + 1; j < originalPoints.length; j++) {
            let currentSquaredWidth = (originalPoints[i].column - originalPoints[j].column) ** 2 +
                (originalPoints[i].row - originalPoints[j].row) ** 2;
            if (currentSquaredWidth > maxSquaredWidth) {
                maxSquaredWidth = currentSquaredWidth;
                maxLinePoints = [originalPoints[i], originalPoints[j]];
            }
        }
    }
    const maxDiameter = {
        length: Math.sqrt(maxSquaredWidth),
        angle: (0, angles_1.toDegrees)((0, getAngle_1.getAngle)(maxLinePoints[0], maxLinePoints[1])),
        points: maxLinePoints,
    };
    return {
        minDiameter,
        maxDiameter,
        aspectRatio: minDiameter.length / maxDiameter.length,
    };
}
exports.getFeret = getFeret;
//# sourceMappingURL=getFeret.js.map