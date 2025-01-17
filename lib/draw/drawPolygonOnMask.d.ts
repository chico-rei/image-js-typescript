import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
import { DrawPolylineOnMaskOptions } from './drawPolylineOnMask';
export interface DrawPolygonOnMaskOptions extends DrawPolylineOnMaskOptions {
    /**
     * Fill polygon.
     */
    filled?: boolean;
    /**
     * Origin of the rectangle relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
}
/**
 * Draw a polygon defined by an array of points on a mask.
 *
 * @param mask - Mask to process.
 * @param points - Polygon vertices.
 * @param options - Draw Line options.
 * @returns The mask with the polygon drawing.
 */
export declare function drawPolygonOnMask(mask: Mask, points: Point[], options?: DrawPolygonOnMaskOptions): Mask;
//# sourceMappingURL=drawPolygonOnMask.d.ts.map