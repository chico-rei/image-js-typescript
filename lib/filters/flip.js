"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.flip = void 0;
const getOutputImage_1 = require("../utils/getOutputImage");
const flipX_1 = __importDefault(require("./flipX"));
const flipY_1 = __importDefault(require("./flipY"));
/**
 *
 * Apply a flip filter to an image.
 *
 * @param image - Image to process.
 * @param options - Flip options.
 * @returns - The processed image.
 */
function flip(image, options = {}) {
    const { axis = 'horizontal' } = options;
    let newImage = (0, getOutputImage_1.getOutputImage)(image, options, { clone: true });
    if (axis === 'horizontal') {
        return (0, flipX_1.default)(newImage);
    }
    else if (axis === 'vertical') {
        return (0, flipY_1.default)(newImage);
    }
    else {
        return (0, flipY_1.default)((0, flipX_1.default)(newImage));
    }
}
exports.flip = flip;
//# sourceMappingURL=flip.js.map