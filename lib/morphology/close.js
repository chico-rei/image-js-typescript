"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.close = void 0;
const __1 = require("..");
const checkKernel_1 = require("../utils/checkKernel");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
/**
 * In mathematical morphology, the closing of a set A by a structuring element B is the erosion of the dilation of that set (Wikipedia).
 * In image processing, closing is, together with opening, the basic workhorse of morphological noise removal.
 * Opening removes small objects, while closing removes small holes.
 * http://docs.opencv.org/2.4/doc/tutorials/imgproc/opening_closing_hats/opening_closing_hats.html
 *
 * @param image - Image to process.
 * @param options - Close options.
 * @returns Closed image.
 */
function close(image, options = {}) {
    let { kernel = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ], iterations = 1, } = options;
    if (image instanceof __1.Image) {
        (0, checkProcessable_1.default)(image, 'close', {
            bitDepth: [__1.ColorDepth.UINT1, __1.ColorDepth.UINT8, __1.ColorDepth.UINT16],
            components: 1,
            alpha: false,
        });
    }
    (0, checkKernel_1.checkKernel)(kernel, 'close');
    let newImage = image;
    for (let i = 0; i < iterations; i++) {
        newImage = newImage.dilate({ kernel }).erode({ kernel });
    }
    return newImage;
}
exports.close = close;
//# sourceMappingURL=close.js.map