"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeDssim = void 0;
const computeSsim_1 = require("./computeSsim");
/**
 * Compute the Structural Dissimilarity (DSSIM) of two GREY images.
 * https://en.wikipedia.org/wiki/Structural_similarity
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @param options - SsimOptions
 * @returns SSIM of the two images.
 */
function computeDssim(image, otherImage, options = {}) {
    const ssim = (0, computeSsim_1.computeSsim)(image, otherImage, options).mssim;
    return (1 - ssim) / 2;
}
exports.computeDssim = computeDssim;
//# sourceMappingURL=computeDssim.js.map