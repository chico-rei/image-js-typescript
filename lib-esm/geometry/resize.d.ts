import { Image } from '../Image';
import { BorderType } from '../utils/interpolateBorder';
import { InterpolationType } from '../utils/interpolatePixel';
export interface ResizeOptions {
    /**
     * Width of the output image.
     */
    width?: number;
    /**
     * Height of the output image.
     */
    height?: number;
    /**
     * Factor by which to scale the width.
     */
    xFactor?: number;
    /**
     * Factor by which to scale the width.
     */
    yFactor?: number;
    /**
     * Should the aspect ratio of the image be preserved?
     */
    preserveAspectRatio?: boolean;
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
}
/**
 * Returns a resized copy of an image.
 *
 * @param image - Original image.
 * @param options - Resize options.
 * @returns The new image.
 */
export declare function resize(image: Image, options: ResizeOptions): Image;
//# sourceMappingURL=resize.d.ts.map