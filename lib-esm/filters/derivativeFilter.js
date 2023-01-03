import { PREWITT_X, PREWITT_Y, SCHARR_X, SCHARR_Y, SOBEL_X, SOBEL_Y, } from '../utils/constants/kernels';
export var DerivativeFilters;
(function (DerivativeFilters) {
    DerivativeFilters["SOBEL"] = "SOBEL";
    DerivativeFilters["SCHARR"] = "SCHARR";
    DerivativeFilters["PREWITT"] = "PREWITT";
    // todo: handle even sized kernels to implement Roberts' filter
    // for 2x2 matrices, the current pixel corresponds to the top-left
    //  ROBERTS = 'ROBERTS',
})(DerivativeFilters || (DerivativeFilters = {}));
/**
 * Apply a derivative filter to an image.
 *
 * @param image - Image to process.
 * @param options - Derivative filter options.
 * @returns The processed image.
 */
export function derivativeFilter(image, options = {}) {
    const { filter = DerivativeFilters.SOBEL } = options;
    let kernelX = SOBEL_X;
    let kernelY = SOBEL_Y;
    switch (filter) {
        case DerivativeFilters.SOBEL:
            break;
        case DerivativeFilters.SCHARR:
            kernelX = SCHARR_X;
            kernelY = SCHARR_Y;
            break;
        case DerivativeFilters.PREWITT:
            kernelX = PREWITT_X;
            kernelY = PREWITT_Y;
            break;
        default:
            throw new Error('derivativeFilter: unrecognised derivative filter.');
    }
    return image.gradientFilter({ kernelX, kernelY, ...options });
}
//# sourceMappingURL=derivativeFilter.js.map