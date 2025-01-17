import { Image } from '../Image';
import { Point } from '../utils/geometry/points';
export interface CropOptions {
    /**
     * Origin of the crop relative to a parent image (top-left corner).
     *
     * @default {row: 0, column: 0}
     */
    origin?: Point;
    /**
     * Specify the width of the cropped image.
     *
     * @default image.width
     */
    width?: number;
    /**
     * Specify the width of the cropped image.
     *
     * @default image.height
     */
    height?: number;
}
/**
 * Crop the input image to a desired size.
 *
 * @param image - Image to crop
 * @param [options] - Crop options.
 * @returns The new cropped image
 * @example
 * var cropped = image.crop({
 *   row:20,
 *   column:100
 * });
 */
export declare function crop(image: Image, options?: CropOptions): Image;
//# sourceMappingURL=crop.d.ts.map