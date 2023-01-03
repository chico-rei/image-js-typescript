"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.level = void 0;
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const clamp_1 = require("../utils/clamp");
const getOutputImage_1 = require("../utils/getOutputImage");
const validators_1 = require("../utils/validators");
/**
 * Level the image using the optional input and output value. This function allows you to enhance the image's contrast.
 *
 * @param image - Image to process.
 * @param options - Level options.
 * @returns The levelled image.
 */
function level(image, options = {}) {
    let { inputMin = 0, inputMax = image.maxValue, outputMin = 0, outputMax = image.maxValue, gamma = 1, channels = new Array(image.components).fill(0).map((value, index) => index), } = options;
    (0, validators_1.validateChannels)(channels, image);
    (0, checkProcessable_1.default)(image, 'level', {
        bitDepth: [8, 16],
    });
    let newImage = (0, getOutputImage_1.getOutputImage)(image, options, { clone: true });
    const clamp = (0, clamp_1.getClamp)(image);
    for (let row = 0; row < image.height; row++) {
        for (let column = 0; column < image.width; column++) {
            for (let channel of channels) {
                let currentValue = image.getValue(column, row, channel);
                let clamped = Math.max(Math.min(currentValue, inputMax), inputMin);
                const ratio = clamp((clamped - inputMin) / (inputMax - inputMin));
                const result = clamp(ratio ** (1 / gamma) * (outputMax - outputMin) + outputMin);
                newImage.setValue(column, row, channel, result);
            }
        }
    }
    return newImage;
}
exports.level = level;
//# sourceMappingURL=level.js.map