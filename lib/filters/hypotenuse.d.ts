import { Image } from '..';
export interface HypotenuseOptions {
    /**
     * Depth of the resulting image.
     *
     * @default image.depth
     */
    depth?: number;
    /**
     * To which channels to apply the filter. By default all but alpha.
     */
    channels?: number[];
}
/**
 * Calculate a new image that is the hypotenuse between the current image and the otherImage.
 *
 * @param image - First image to process.
 * @param otherImage - Second image.
 * @param options - Hypotenuse options.
 * @returns Hypotenuse of the two images.
 */
export declare function hypotenuse(image: Image, otherImage: Image, options?: HypotenuseOptions): Image;
//# sourceMappingURL=hypotenuse.d.ts.map