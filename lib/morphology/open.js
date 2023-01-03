"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.open = void 0;
const __1 = require("..");
const checkKernel_1 = require("../utils/checkKernel");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
/**
 * In mathematical morphology, opening is the dilation of the erosion of a set A by a structuring element B.
 * Together with closing, the opening serves in computer vision and image processing as a basic workhorse of morphological noise removal.
 * Opening removes small objects from the foreground (usually taken as the bright pixels) of an image,
 * placing them in the background, while closing removes small holes in the foreground, changing small islands of background into foreground. (Wikipedia)
 * http://docs.opencv.org/2.4/doc/tutorials/imgproc/opening_closing_hats/opening_closing_hats.html
 *
 * @param image - Image to process.
 * @param options - Open options
 * @returns The opened image
 */
function open(image, options = {}) {
    let { kernel = [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
    ], iterations = 1, } = options;
    if (image instanceof __1.Image) {
        (0, checkProcessable_1.default)(image, 'open', {
            bitDepth: [__1.ColorDepth.UINT1, __1.ColorDepth.UINT8, __1.ColorDepth.UINT16],
            components: 1,
            alpha: false,
        });
    }
    (0, checkKernel_1.checkKernel)(kernel, 'open');
    let newImage = image;
    for (let i = 0; i < iterations; i++) {
        newImage = newImage.erode({ kernel });
        newImage = newImage.dilate({ kernel });
    }
    return newImage;
}
exports.open = open;
//# sourceMappingURL=open.js.map