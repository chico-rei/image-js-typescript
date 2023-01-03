import { Image, ImageColorModel } from '..';
import checkProcessable from '../utils/checkProcessable';
import { BorderType } from '../utils/interpolateBorder';
/**
 * Apply a gradient filter to an image.
 *
 * @param image - The image to process.
 * @param options - Gradient filter options.
 * @returns The gradient image.
 */
export function gradientFilter(image, options) {
    const { borderType = BorderType.REPLICATE, borderValue = 0 } = options;
    checkProcessable(image, 'gradientFilter', {
        bitDepth: [8, 16],
        colorModel: ImageColorModel.GREY,
    });
    if ('kernelX' in options && 'kernelY' in options) {
        const { kernelX, kernelY } = options;
        const gradientX = image.rawDirectConvolution(kernelX, {
            borderType,
            borderValue,
        });
        const gradientY = image.rawDirectConvolution(kernelY, {
            borderType,
            borderValue,
        });
        let gradient = new Image(image.width, image.height, {
            colorModel: ImageColorModel.GREY,
        });
        for (let i = 0; i < image.size; i++) {
            gradient.setValueByIndex(i, 0, Math.hypot(gradientX[i], gradientY[i]));
        }
        return gradient;
    }
    else if ('kernelX' in options) {
        return image.directConvolution(options.kernelX, {
            borderType,
            borderValue,
        });
    }
    else if ('kernelY' in options) {
        return image.directConvolution(options.kernelY, {
            borderType,
            borderValue,
        });
    }
    else {
        throw new Error(`kernelX and KernelY are not defined`);
    }
}
//# sourceMappingURL=gradientFilter.js.map