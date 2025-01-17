import { Image } from '../Image';
import { Point } from '../geometry';
export interface IsFastKeypointOptions {
    /**
     * Number of contiguous pixels on the circle that should have an intensity difference with current pixel larger than threshold.
     * This value is recommended to be 3/4 of the circle points.
     *
     * @default 3/4*circlePoints.length
     */
    nbContiguousPixels?: number;
    /**
     * Threshold for the intensity difference.
     *
     * @default 20
     */
    threshold?: number;
}
/**
 * Determine wether a pixel in an image is a corner according to the FAST algorithm.
 *
 * @param origin - Pixel to process.
 * @param image - Image to process
 * @param circlePoints - Coordinates of the points on the circle.
 * @param compassPoints - Compass points for quick test.
 * @param options - Is FAST keypoint options.
 * @returns Whether the current pixel is a corner or not.
 */
export declare function isFastKeypoint(origin: Point, image: Image, circlePoints: Point[], compassPoints: Point[], options?: IsFastKeypointOptions): boolean;
//# sourceMappingURL=isFastKeypoint.d.ts.map