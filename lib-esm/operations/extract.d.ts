import { Image } from '../Image';
import { Mask } from '../Mask';
import { Point } from '../utils/geometry/points';
export interface ExtractOptions {
    /**
     * Origin of the ROI relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
}
/**
 * Extract the pixels of an image, as specified in a mask.
 *
 * @param image - The image to process.
 * @param mask - The mask defining which pixels to keep.
 * @param options - Extract options.
 * @returns The extracted image.
 */
export declare function extract(image: Image, mask: Mask, options?: ExtractOptions): Image;
//# sourceMappingURL=extract.d.ts.map