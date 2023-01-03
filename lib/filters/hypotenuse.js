"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hypotenuse = void 0;
const __1 = require("..");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const validators_1 = require("../utils/validators");
/**
 * Calculate a new image that is the hypotenuse between the current image and the otherImage.
 *
 * @param image - First image to process.
 * @param otherImage - Second image.
 * @param options - Hypotenuse options.
 * @returns Hypotenuse of the two images.
 */
function hypotenuse(image, otherImage, options = {}) {
    let { depth = image.depth, channels = [] } = options;
    for (let i = 0; i < image.components; i++) {
        channels.push(i);
    }
    (0, checkProcessable_1.default)(image, 'hypotenuse', {
        bitDepth: [8, 16, 32],
    });
    if (image.width !== otherImage.width || image.height !== otherImage.height) {
        throw new Error('hypotenuse: both images must have the same size');
    }
    if (image.alpha !== otherImage.alpha || image.depth !== otherImage.depth) {
        throw new Error('hypotenuse: both images must have the same alpha and bitDepth');
    }
    if (image.channels !== otherImage.channels) {
        throw new Error('hypotenuse: both images must have the same number of channels');
    }
    (0, validators_1.validateChannels)(channels, image);
    let newImage = __1.Image.createFrom(image, { depth });
    for (const channel of channels) {
        for (let i = 0; i < image.size; i++) {
            let value = Math.hypot(image.getValueByIndex(i, channel), otherImage.getValueByIndex(i, channel));
            newImage.setValueByIndex(i, channel, value > newImage.maxValue ? newImage.maxValue : value);
        }
    }
    return newImage;
}
exports.hypotenuse = hypotenuse;
//# sourceMappingURL=hypotenuse.js.map