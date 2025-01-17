import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
export interface DrawPolylineOnMaskOptions {
    /**
     * Origin of the rectangle relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Mask to which the resulting image has to be put.
     */
    out?: Mask;
}
/**
 * Draw a polyline defined by an array of points on an image.
 *
 * @param mask - Mask to process.
 * @param points - Polyline array of points.
 * @param options - Draw polyline options.
 * @returns The mask with the polyline drawing.
 */
export declare function drawPolylineOnMask(mask: Mask, points: Point[], options?: DrawPolylineOnMaskOptions): Mask;
//# sourceMappingURL=drawPolylineOnMask.d.ts.map