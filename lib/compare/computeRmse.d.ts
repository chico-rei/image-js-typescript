import { Image } from '..';
/**
 * Compute the Root Mean Square Error (RMSE) between two images. It is just the square root of the MSE.
 * https://en.wikipedia.org/wiki/Root-mean-square_deviation
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @returns RMSE of the two images.
 */
export declare function computeRmse(image: Image, otherImage: Image): number;
/**
 * Compute the Mean Square Error (MSE) between two images.
 * The input images can have any number of channels.
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @returns MSE of the two images.
 */
export declare function computeMse(image: Image, otherImage: Image): number;
//# sourceMappingURL=computeRmse.d.ts.map