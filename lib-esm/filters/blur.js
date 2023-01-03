import { separableConvolution } from './convolution';
/**
 * Blur an image. The pixel in the center becomes an average of the surrounding ones.
 *
 * @param image - Image to blur.
 * @param options - Blur options
 * @returns The blurred image.
 */
export function blur(image, options) {
    const { width, height } = options;
    const kernelX = new Array(width).fill(1);
    const kernelY = new Array(height).fill(1);
    return separableConvolution(image, kernelX, kernelY, {
        normalize: true,
        ...options,
    });
}
//# sourceMappingURL=blur.js.map