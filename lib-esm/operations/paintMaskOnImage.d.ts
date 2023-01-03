import { Image } from '../Image';
import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
export interface PaintMaskOnImageOptions {
    /**
     * Top-left corner of the mask relative to a parent image.
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Color with which to blend the image pixel.
     *
     * @default Opaque black.
     */
    color?: Array<number | null>;
    /**
     * Should the given color be blended with the original pixel?
     *
     * @default true
     */
    blend?: boolean;
    /**
     * Image to which to output.
     */
    out?: Image;
}
/**
 * Paint a mask onto an image and the given position and with the given color.
 *
 * @param image - Image on which to paint the mask.
 * @param mask - Mask to paint on the image.
 * @param options - Paint mask options.
 * @returns The painted image.
 */
export declare function paintMaskOnImage(image: Image, mask: Mask, options?: PaintMaskOnImageOptions): Image;
//# sourceMappingURL=paintMaskOnImage.d.ts.map