import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
export interface GetBorderPointsOptions {
    /**
     * Should the inner borders be returned too?
     *
     * @default false
     */
    innerBorders?: boolean;
    /**
     * Consider pixels connected by corners?
     *
     * @default false
     */
    allowCorners?: boolean;
}
/**
 * Return an array with the coordinates of the pixels that are on the border of the mask.
 * The reference is the top-left corner of the ROI.
 *
 * @param mask - Mask to process.
 * @param options - Get border points options.
 * @returns The array of border pixels.
 */
export declare function getBorderPoints(mask: Mask, options?: GetBorderPointsOptions): Array<Point>;
//# sourceMappingURL=getBorderPoints.d.ts.map