import { Image } from '../Image';
import { BorderType } from '../utils/interpolateBorder';
export interface BlurOptions {
    /**
     * Width of the blurring matrix, must be an odd integer.
     */
    width: number;
    /**
     * Height of the blurring matrix, must be an odd integer.
     */
    height: number;
    /**
     * Explicit how to handle the borders.
     *
     * @default BorderType.REFLECT_101
     */
    borderType?: BorderType;
    /**
     * Value of the border if BorderType is CONSTANT.
     *
     * @default 0
     */
    borderValue?: number;
    /**
     * Image to which to output.
     */
    out?: Image;
}
/**
 * Blur an image. The pixel in the center becomes an average of the surrounding ones.
 *
 * @param image - Image to blur.
 * @param options - Blur options
 * @returns The blurred image.
 */
export declare function blur(image: Image, options: BlurOptions): Image;
//# sourceMappingURL=blur.d.ts.map