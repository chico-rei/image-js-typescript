import { Image } from '../Image';
import { BorderType } from '../utils/interpolateBorder';
import { InterpolationType } from '../utils/interpolatePixel';
export interface TransformOptions {
    /**
     * Width of the output image.
     */
    width?: number;
    /**
     * Height of the output image.
     */
    height?: number;
    /**
     * Method to use to interpolate the new pixels
     *
     * @default InterpolationType.BILINEAR
     */
    interpolationType?: InterpolationType;
    /**
     * Specify how the borders should be handled.
     *
     * @default BorderType.CONSTANT
     */
    borderType?: BorderType;
    /**
     * Value of the border if BorderType is CONSTANT.
     *
     * @default 0
     */
    borderValue?: number;
    /**
     * Should the transform matrix be inverted?
     */
    inverse?: boolean;
    fullImage?: boolean;
}
/**
 * Transforms an image using a matrix.
 *
 * @param image - Original image.
 * @param transformMatrix - 2×3 transform matrix.
 * @param options - Transform options.
 * @returns The new image.
 */
export declare function transform(image: Image, transformMatrix: number[][], options?: TransformOptions): Image;
//# sourceMappingURL=transform.d.ts.map