"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morphologicalGradient = void 0;
const __1 = require("..");
const compare_1 = require("../compare");
const checkKernel_1 = require("../utils/checkKernel");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
/**
 * In mathematical morphology and digital image processing, a morphological gradient is the difference between the dilation and the erosion of a given image. It is an image where each pixel value (typically non-negative) indicates the contrast intensity in the close neighborhood of that pixel. It is useful for edge detection and segmentation applications.
 * http://docs.opencv.org/2.4/doc/tutorials/imgproc/opening_closing_hats/opening_closing_hats.html
 *
 *
 * @param image - Image to process
 * @param options - Morphological gradient hat options
 * @returns The processed image
 */
function morphologicalGradient(image, options = {}) {
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
    (0, checkKernel_1.checkKernel)(kernel, 'morphologicalGradient');
    let newImage = image;
    for (let i = 0; i < iterations; i++) {
        let dilatedImage = newImage.dilate({ kernel });
        let erodedImage = newImage.erode({ kernel });
        newImage = (0, compare_1.subtract)(dilatedImage, erodedImage, { absolute: true });
    }
    return newImage;
}
exports.morphologicalGradient = morphologicalGradient;
//# sourceMappingURL=morphologicalGradient.js.map