import { computeSsim } from './computeSsim';
/**
 * Compute the Structural Dissimilarity (DSSIM) of two GREY images.
 * https://en.wikipedia.org/wiki/Structural_similarity
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @param options - SsimOptions
 * @returns SSIM of the two images.
 */
export function computeDssim(image, otherImage, options = {}) {
    const ssim = computeSsim(image, otherImage, options).mssim;
    return (1 - ssim) / 2;
}
//# sourceMappingURL=computeDssim.js.map