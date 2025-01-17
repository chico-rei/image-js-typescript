import { Mask } from '../../Mask';
import { Point } from '../../utils/geometry/points';
/**
 * Get the pixels that surround an ROI. The pixels include the top and left borders,
 * but extend the right and bottom one by one pixel.
 * This allows to compute the minimum bounding rectangle with the correct surface.
 * This method is only used to calculate minimalBoundRectangle and convexHull.
 *
 * @param mask - The ROI for which to get the extended border points.
 * @returns - The array of points.
 */
export declare function getExtendedBorderPoints(mask: Mask): Point[];
//# sourceMappingURL=getExtendedBorderPoints.d.ts.map