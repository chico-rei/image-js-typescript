import { BitValue, Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
export interface PaintMaskOnMaskOptions {
    /**
     * Top-left corner of the mask relative to a parent image.
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Value with which to set the pixel.
     *
     * @default 1
     */
    value?: BitValue;
    /**
     * Mask to which to output.
     */
    out?: Mask;
}
/**
 * Paint a mask onto an image and the given position and with the given color.
 *
 * @param image - Image on which to paint the mask.
 * @param mask - Mask to paint on the image.
 * @param options - Paint mask options.
 * @returns The painted image.
 */
export declare function paintMaskOnMask(image: Mask, mask: Mask, options?: PaintMaskOnMaskOptions): Mask;
//# sourceMappingURL=paintMaskOnMask.d.ts.map