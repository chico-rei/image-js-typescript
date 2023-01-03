import { Image, ImageCoordinates } from '../Image';
import { Point } from '../utils/geometry/points';
import { BorderType } from '../utils/interpolateBorder';
import { InterpolationType } from '../utils/interpolatePixel';
export interface RotateOptions {
    /**
     * Specify the rotation center point as a predefined string or a [column, row] point.
     *
     * @default The center of the image.
     */
    center?: ImageCoordinates | Point;
    /**
     * Scaling factor for the rotated image.
     *
     * @default 1
     */
    scale?: number;
    /**
     * Width of the final image.
     */
    width?: number;
    /**
     * Height of the final image.
     */
    height?: number;
    fullImage?: boolean;
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
 * Rotate an image anti-clockwise of a given angle.
 *
 * @param image - Original image.
 * @param angle - Angle in degrees.
 * @param options - Rotate options.
 * @returns A new rotated image.
 */
export declare function rotate(image: Image, angle: number, options?: RotateOptions): Image;
//# sourceMappingURL=rotate.d.ts.map