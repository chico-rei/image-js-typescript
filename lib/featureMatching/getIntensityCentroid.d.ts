import { Image } from '../Image';
import { Point } from '../geometry';
/**
 * Compute the intensity centroid of an image for each channel relatively to the center of the image.
 * Original article: {@link https://doi.org/10.1006/cviu.1998.0719}
 *
 * @see {@link https://en.wikipedia.org/wiki/Image_moment}
 * @param image - Image to process.
 * @returns The intensity centroid of each channel of the image.
 */
export declare function getIntensityCentroid(image: Image): Point[];
//# sourceMappingURL=getIntensityCentroid.d.ts.map