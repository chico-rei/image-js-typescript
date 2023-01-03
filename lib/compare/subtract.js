"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subtract = void 0;
const __1 = require("..");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const validators_1 = require("../utils/validators");
/**
 * Calculate a new image that is the subtraction between the current image and the otherImage.
 *
 * @param image - Image from which to subtract
 * @param otherImage - Image to subtract
 * @param options - Subtract options.
 * @returns The subtracted image
 */
function subtract(image, otherImage, options = {}) {
    let { absolute = false } = options;
    if (image instanceof __1.Image) {
        (0, checkProcessable_1.default)(image, 'subtract', {
            bitDepth: [__1.ColorDepth.UINT1, __1.ColorDepth.UINT8, __1.ColorDepth.UINT16],
            components: [1, 3],
            alpha: false,
        });
    }
    (0, validators_1.validateForComparison)('subtract', image, otherImage);
    let newImage = image.clone();
    if (newImage instanceof __1.Image) {
        for (let index = 0; index < image.size; index++) {
            for (let channel = 0; channel < image.channels; channel++) {
                let value = image.getValueByIndex(index, channel) -
                    otherImage.getValueByIndex(index, channel);
                if (absolute) {
                    newImage.setValueByIndex(index, channel, Math.abs(value));
                }
                else {
                    newImage.setValueByIndex(index, channel, Math.max(value, 0));
                }
            }
        }
    }
    else if (image instanceof __1.Mask && otherImage instanceof __1.Mask) {
        for (let index = 0; index < image.size; index++) {
            let value = image.getBitByIndex(index) - otherImage.getBitByIndex(index);
            if (absolute) {
                newImage.setBitByIndex(index, Math.abs(value) ? 1 : 0);
            }
            else {
                newImage.setBitByIndex(index, Math.max(value, 0) ? 1 : 0);
            }
        }
    }
    return newImage;
}
exports.subtract = subtract;
//# sourceMappingURL=subtract.js.map