"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blur = void 0;
const convolution_1 = require("./convolution");
/**
 * Blur an image. The pixel in the center becomes an average of the surrounding ones.
 *
 * @param image - Image to blur.
 * @param options - Blur options
 * @returns The blurred image.
 */
function blur(image, options) {
    const { width, height } = options;
    const kernelX = new Array(width).fill(1);
    const kernelY = new Array(height).fill(1);
    return (0, convolution_1.separableConvolution)(image, kernelX, kernelY, {
        normalize: true,
        ...options,
    });
}
exports.blur = blur;
//# sourceMappingURL=blur.js.map