"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.histogram = void 0;
const validators_1 = require("../utils/validators");
/**
 * Returns a histogram of pixel intensities.
 *
 * @param image - The original image.
 * @param options - Histogram options.
 * @returns - The histogram.
 */
function histogram(image, options = {}) {
    let { channel } = options;
    if (typeof channel !== 'number') {
        if (image.channels !== 1) {
            throw new Error('channel option is mandatory for multi-channel images');
        }
        channel = 0;
    }
    (0, validators_1.validateChannel)(channel, image);
    const hist = new Uint32Array(image.maxValue + 1);
    for (let i = 0; i < image.size; i++) {
        hist[image.getValueByIndex(i, channel)]++;
    }
    return hist;
}
exports.histogram = histogram;
//# sourceMappingURL=histogram.js.map