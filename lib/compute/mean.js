"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mean = void 0;
/**
 * Compute the mean of an image. The mean can be either computed on each channel
 * individually or on the whole image.
 *
 * @param image - Image to process.
 * @returns The mean pixel.
 */
function mean(image) {
    let pixel = new Array(image.channels).fill(0);
    for (let row = 0; row < image.height; row++) {
        for (let column = 0; column < image.width; column++) {
            for (let channel = 0; channel < image.channels; channel++) {
                pixel[channel] += image.getValue(column, row, channel);
            }
        }
    }
    const channelMeans = pixel.map((channel) => channel / image.size);
    return channelMeans;
}
exports.mean = mean;
//# sourceMappingURL=mean.js.map