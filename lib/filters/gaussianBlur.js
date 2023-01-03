"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gaussianBlur = void 0;
const convolution_1 = require("./convolution");
function getRadius(size) {
    if (size % 2 !== 1 || size < 0) {
        throw new Error('gaussianBlur: gaussian blur size must be positive and odd');
    }
    return (size - 1) / 2;
}
/**
 * Apply a gaussian filter to an image.
 *
 * @param image - Image to blur.
 * @param options - Gaussian blur options.
 * @returns The blurred image.
 */
function gaussianBlur(image, options) {
    if ('sigma' in options) {
        const { sigma, size = getSize(sigma), borderType } = options;
        const radius = getRadius(size);
        const kernel = getKernel(radius, sigma);
        return (0, convolution_1.separableConvolution)(image, kernel, kernel, {
            borderType,
        });
    }
    else {
        const { sigmaX, sigmaY, sizeX = getSize(sigmaX), sizeY = getSize(sigmaY), borderType, } = options;
        const radiusX = getRadius(sizeX);
        const radiusY = getRadius(sizeY);
        const kernelX = getKernel(radiusX, sigmaX);
        const kernelY = getKernel(radiusY, sigmaY);
        return (0, convolution_1.separableConvolution)(image, kernelX, kernelY, {
            borderType,
        });
    }
}
exports.gaussianBlur = gaussianBlur;
function getKernel(radius, sigma) {
    const n = radius * 2 + 1;
    const kernel = new Array(n);
    // TODO: check if sigma can really be 0 or undefined.
    const sigmaX = sigma || ((n - 1) * 0.5 - 1) * 0.3 + 0.8;
    const scale2X = -0.5 / (sigmaX * sigmaX);
    let sum = 0;
    for (let i = 0; i < n; i++) {
        const x = i - radius;
        const t = Math.exp(scale2X * x * x);
        kernel[i] = t;
        sum += t;
    }
    for (let i = 0; i < n; i++) {
        kernel[i] /= sum;
    }
    return kernel;
}
function getSize(sigma) {
    return 2 * Math.ceil(2 * sigma) + 1;
}
//# sourceMappingURL=gaussianBlur.js.map