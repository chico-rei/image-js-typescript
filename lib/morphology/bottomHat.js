"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bottomHat = void 0;
const __1 = require("..");
const compare_1 = require("../compare");
const checkKernel_1 = require("../utils/checkKernel");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
/**
 * This function is the black top hat (also called bottom hat).
 * In mathematical morphology and digital image processing,
 * top-hat transform is an operation that extracts small elements and details from given images.
 * The black top-hat transform is defined dually as the difference between the closed and the input image.
 * Top-hat transforms are used for various image processing tasks, such as feature extraction, background equalization,
 * image enhancement, and others. (Wikipedia)
 * http://docs.opencv.org/2.4/doc/tutorials/imgproc/opening_closing_hats/opening_closing_hats.html
 *
 * @param image - Image to process
 * @param options - Bottom hat options
 * @returns The bottom-hatted image
 */
function bottomHat(image, options = {}) {
    let { kernel = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ], iterations = 1, } = options;
    if (image instanceof __1.Image) {
        (0, checkProcessable_1.default)(image, 'bottomHat', {
            bitDepth: [__1.ColorDepth.UINT1, __1.ColorDepth.UINT8, __1.ColorDepth.UINT16],
            components: 1,
            alpha: false,
        });
    }
    (0, checkKernel_1.checkKernel)(kernel, 'bottomHat');
    let newImage = image;
    for (let i = 0; i < iterations; i++) {
        let openImage = newImage.close({ kernel });
        newImage = (0, compare_1.subtract)(openImage, newImage, { absolute: true });
    }
    return newImage;
}
exports.bottomHat = bottomHat;
//# sourceMappingURL=bottomHat.js.map