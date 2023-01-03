"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeSsim = void 0;
const ssim_js_1 = require("ssim.js");
const __1 = require("..");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const validators_1 = require("../utils/validators");
/**
 * Compute the Structural Similarity (SSIM) of two RGBA or two GREY images.
 * "The resultant SSIM index is a decimal value between -1 and 1,
 * where 1 indicates perfect similarity, 0 indicates no similarity,
 * and -1 indicates perfect anti-correlation." -
 * https://en.wikipedia.org/wiki/Structural_similarity
 *
 * @param image - First image.
 * @param otherImage - Second image.
 * @param options - SSIM options.
 * @returns SSIM of the two images.
 */
function computeSsim(image, otherImage, options = {}) {
    let { windowSize, algorithm = 'original' } = options;
    if (windowSize) {
        if (windowSize > image.width || windowSize > image.height) {
            throw new Error('ssim: windowSize cannot exceed image dimensions');
        }
    }
    else {
        windowSize = Math.min(11, image.height, image.width);
    }
    (0, checkProcessable_1.default)(image, 'ssim', {
        bitDepth: [__1.ColorDepth.UINT8],
        channels: [1, 3, 4],
    });
    (0, validators_1.validateForComparison)('ssim', image, otherImage);
    if (image.colorModel !== __1.ImageColorModel.RGBA) {
        image = image.convertColor(__1.ImageColorModel.RGBA);
        otherImage = otherImage.convertColor(__1.ImageColorModel.RGBA);
    }
    const imageData = new Uint8ClampedArray(image.getRawImage().data);
    const imageBuffer = {
        height: image.height,
        width: image.width,
        data: imageData,
    };
    const otherData = new Uint8ClampedArray(otherImage.getRawImage().data);
    const otherBuffer = {
        height: otherImage.height,
        width: otherImage.width,
        data: otherData,
    };
    const ssim = (0, ssim_js_1.ssim)(imageBuffer, otherBuffer, {
        windowSize,
        ssim: algorithm,
    });
    return {
        mssim: ssim.mssim,
        ssimMap: ssim.ssim_map,
    };
}
exports.computeSsim = computeSsim;
//# sourceMappingURL=computeSsim.js.map