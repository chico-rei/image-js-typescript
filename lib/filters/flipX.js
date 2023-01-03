"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
/**
 * Apply a flipX filter to an image.
 *
 * @param image - Image to process.
 * @returns The processed image.
 */
function flipX(image) {
    (0, checkProcessable_1.default)(image, 'flipX', {
        bitDepth: [8, 16],
    });
    for (let row = 0; row < image.height; row++) {
        for (let column = 0; column < Math.floor(image.width / 2); column++) {
            const currentCol = column;
            const oppositeCol = image.width - column - 1;
            for (let channel = 0; channel < image.channels; channel++) {
                const tmp = image.getValue(currentCol, row, channel);
                image.setValue(currentCol, row, channel, image.getValue(oppositeCol, row, channel));
                image.setValue(oppositeCol, row, channel, tmp);
            }
        }
    }
    return image;
}
exports.default = flipX;
//# sourceMappingURL=flipX.js.map