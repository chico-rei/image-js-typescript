"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computePsnr = void 0;
const computeRmse_1 = require("./computeRmse");
/**
 * Compute the Peak signal-to-noise ratio (PSNR) between two images.
 * The larger the PSNR, the more similar the images.
 * https://en.wikipedia.org/wiki/Peak_signal-to-noise_ratio
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @returns PSNR of the two images in decibels.
 */
function computePsnr(image, otherImage) {
    const rmsePixel = (0, computeRmse_1.computeRmse)(image, otherImage);
    return 20 * Math.log10(image.maxValue / (rmsePixel + Number.MIN_VALUE));
}
exports.computePsnr = computePsnr;
//# sourceMappingURL=computePsnr.js.map