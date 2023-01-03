"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gradientFilter = void 0;
const __1 = require("..");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const interpolateBorder_1 = require("../utils/interpolateBorder");
/**
 * Apply a gradient filter to an image.
 *
 * @param image - The image to process.
 * @param options - Gradient filter options.
 * @returns The gradient image.
 */
function gradientFilter(image, options) {
    const { borderType = interpolateBorder_1.BorderType.REPLICATE, borderValue = 0 } = options;
    (0, checkProcessable_1.default)(image, 'gradientFilter', {
        bitDepth: [8, 16],
        colorModel: __1.ImageColorModel.GREY,
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
        let gradient = new __1.Image(image.width, image.height, {
            colorModel: __1.ImageColorModel.GREY,
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
exports.gradientFilter = gradientFilter;
//# sourceMappingURL=gradientFilter.js.map