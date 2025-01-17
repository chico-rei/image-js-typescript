import { toDegrees } from '../utils/geometry/angles';
import { rotate } from '../utils/geometry/points';
import { getAngle } from './utils/getAngle';
/**
 * Computes the Feret diameters
 * https://www.sympatec.com/en/particle-measurement/glossary/particle-shape/#
 * http://portal.s2nano.org:8282/files/TEM_protocol_NANoREG.pdf
 *
 * @param mask - The mask of the ROI.
 * @returns The Feret diameters.
 */
export function getFeret(mask) {
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
        let angle = getAngle(originalPoints[i], originalPoints[(i + 1) % originalPoints.length]);
        // We rotate so that it is parallel to X axis.
        const temporaryPoints = rotate(-angle, originalPoints);
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
        points: rotate(minWidthAngle, minLinePoints),
        length: minWidth,
        angle: toDegrees(minWidthAngle),
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
        angle: toDegrees(getAngle(maxLinePoints[0], maxLinePoints[1])),
        points: maxLinePoints,
    };
    return {
        minDiameter,
        maxDiameter,
        aspectRatio: minDiameter.length / maxDiameter.length,
    };
}
//# sourceMappingURL=getFeret.js.map