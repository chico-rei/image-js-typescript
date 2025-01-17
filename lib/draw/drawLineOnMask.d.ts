import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
export interface DrawLineOnMaskOptions {
    /**
     * Origin of the line relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Mask to which the result has to be put.
     */
    out?: Mask;
}
/**
 * Draw a line defined by two points onto a mask.
 *
 * @param mask - Mask to process.
 * @param from - Line starting point.
 * @param to - Line ending point.
 * @param options - Draw Line options.
 * @returns The mask with the line drawing.
 */
export declare function drawLineOnMask(mask: Mask, from: Point, to: Point, options?: DrawLineOnMaskOptions): Mask;
//# sourceMappingURL=drawLineOnMask.d.ts.map