import { Image } from '../Image';
import { Point } from '../geometry';
export interface GetIntensityMomentOptions {
    /**
     * Origin for the moment computation.
     *
     * @default The center of the image.
     */
    origin?: Point;
}
/**
 * Compute the pq order intensity moment of the image
 * relatively to the origin defined in the options.
 * Original article: {@link https://doi.org/10.1006/cviu.1998.0719}
 *
 * @see {@link https://en.wikipedia.org/wiki/Image_moment}
 * @param image - Image to process. Should have an odd number of rows and columns.
 * @param p - Order along x.
 * @param q - Order along y.
 * @param options - Get intensity moment options.
 * @returns The intensity moment of order pq.
 */
export declare function getIntensityMoment(image: Image, p: number, q: number, options?: GetIntensityMomentOptions): number[];
//# sourceMappingURL=getIntensityMoment.d.ts.map