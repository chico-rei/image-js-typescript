import { Image } from '../../Image';
import { Point } from '../../geometry';
/**
 * Crop the source image to given dimensions around the origin.
 *
 * @param image - Source image.
 * @param origin - Center point for the crop.
 * @param patchSize - Size of the returned image.
 * @returns The square image around the origin extracted from the source image.
 */
export declare function extractSquareImage(image: Image, origin: Point, patchSize: number): Image;
//# sourceMappingURL=extractSquareImage.d.ts.map