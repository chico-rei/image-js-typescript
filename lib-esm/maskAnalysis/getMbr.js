import { getExtendedBorderPoints } from './utils/getExtendedBorderPoints';
import { getMbrFromPoints } from './utils/getMbrFromPoints';
import { monotoneChainConvexHull } from './utils/monotoneChainConvexHull';
/**
 * Get the four corners of the minimun bounding rectangle of an ROI.
 *
 * @param mask - The ROI to process.
 * @returns The array of corners.
 */
export function getMbr(mask) {
    const vertices = monotoneChainConvexHull(getExtendedBorderPoints(mask));
    return getMbrFromPoints(vertices);
}
//# sourceMappingURL=getMbr.js.map