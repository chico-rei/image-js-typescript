import { Image } from '../Image';
export interface FlipOptions {
    /**
     * Image to which the resulting image has to be put.
     *
     * @default 'horizontal'
     */
    axis?: 'horizontal' | 'vertical' | 'both';
    /**
     * Image to which the resulting image has to be put.
     */
    out?: Image;
}
/**
 *
 * Apply a flip filter to an image.
 *
 * @param image - Image to process.
 * @param options - Flip options.
 * @returns - The processed image.
 */
export declare function flip(image: Image, options?: FlipOptions): Image;
//# sourceMappingURL=flip.d.ts.map