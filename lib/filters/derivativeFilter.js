"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.derivativeFilter = exports.DerivativeFilters = void 0;
const kernels_1 = require("../utils/constants/kernels");
var DerivativeFilters;
(function (DerivativeFilters) {
    DerivativeFilters["SOBEL"] = "SOBEL";
    DerivativeFilters["SCHARR"] = "SCHARR";
    DerivativeFilters["PREWITT"] = "PREWITT";
    // todo: handle even sized kernels to implement Roberts' filter
    // for 2x2 matrices, the current pixel corresponds to the top-left
    //  ROBERTS = 'ROBERTS',
})(DerivativeFilters = exports.DerivativeFilters || (exports.DerivativeFilters = {}));
/**
 * Apply a derivative filter to an image.
 *
 * @param image - Image to process.
 * @param options - Derivative filter options.
 * @returns The processed image.
 */
function derivativeFilter(image, options = {}) {
    const { filter = DerivativeFilters.SOBEL } = options;
    let kernelX = kernels_1.SOBEL_X;
    let kernelY = kernels_1.SOBEL_Y;
    switch (filter) {
        case DerivativeFilters.SOBEL:
            break;
        case DerivativeFilters.SCHARR:
            kernelX = kernels_1.SCHARR_X;
            kernelY = kernels_1.SCHARR_Y;
            break;
        case DerivativeFilters.PREWITT:
            kernelX = kernels_1.PREWITT_X;
            kernelY = kernels_1.PREWITT_Y;
            break;
        default:
            throw new Error('derivativeFilter: unrecognised derivative filter.');
    }
    return image.gradientFilter({ kernelX, kernelY, ...options });
}
exports.derivativeFilter = derivativeFilter;
//# sourceMappingURL=derivativeFilter.js.map