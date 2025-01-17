import { Mask, Point } from '..';
export interface FloodFillOptions {
    /**
     * Origin for the algorithm relative to the top-left corner of the image.
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Consider pixels connected by corners?
     *
     * @default false
     */
    allowCorners?: boolean;
    /**
     * Specify the output image.
     */
    out?: Mask;
}
/**
 * Apply a flood fill algorithm to an image.
 *
 * @param mask - Mask to process.
 * @param options - Flood fill options.
 * @returns The filled mask.
 */
export declare function floodFill(mask: Mask, options?: FloodFillOptions): Mask;
//# sourceMappingURL=floodFill.d.ts.map