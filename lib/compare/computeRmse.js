"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeMse = exports.computeRmse = void 0;
/**
 * Compute the Root Mean Square Error (RMSE) between two images. It is just the square root of the MSE.
 * https://en.wikipedia.org/wiki/Root-mean-square_deviation
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @returns RMSE of the two images.
 */
function computeRmse(image, otherImage) {
    const globalMse = computeMse(image, otherImage);
    return Math.sqrt(globalMse);
}
exports.computeRmse = computeRmse;
/**
 * Compute the Mean Square Error (MSE) between two images.
 * The input images can have any number of channels.
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @returns MSE of the two images.
 */
function computeMse(image, otherImage) {
    const difference = image.subtract(otherImage, { absolute: true });
    let sum = 0;
    for (let i = 0; i < image.size; i++) {
        for (let channel = 0; channel < image.channels; channel++) {
            const value = difference.getValueByIndex(i, channel);
            sum += Math.pow(value, 2);
        }
    }
    return sum / (image.size * image.channels);
}
exports.computeMse = computeMse;
//# sourceMappingURL=computeRmse.js.map