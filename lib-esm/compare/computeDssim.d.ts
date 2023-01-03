import { Image } from '..';
import { SsimOptions } from './computeSsim';
/**
 * Compute the Structural Dissimilarity (DSSIM) of two GREY images.
 * https://en.wikipedia.org/wiki/Structural_similarity
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @param options - SsimOptions
 * @returns SSIM of the two images.
 */
export declare function computeDssim(image: Image, otherImage: Image, options?: SsimOptions): number;
//# sourceMappingURL=computeDssim.d.ts.map