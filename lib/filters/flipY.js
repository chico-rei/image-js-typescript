"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
/**
 * Apply a flipY filter to an image.
 *
 * @param image - Image to process.
 * @returns The processed image.
 */
function flipY(image) {
    (0, checkProcessable_1.default)(image, 'flipY', {
        bitDepth: [8, 16],
    });
    for (let row = 0; row < Math.floor(image.height / 2); row++) {
        for (let column = 0; column < image.width; column++) {
            const currentRow = row;
            const oppositeRow = image.height - row - 1;
            for (let channel = 0; channel < image.channels; channel++) {
                const tmp = image.getValue(column, currentRow, channel);
                image.setValue(column, currentRow, channel, image.getValue(column, oppositeRow, channel));
                image.setValue(column, oppositeRow, channel, tmp);
            }
        }
    }
    return image;
}
exports.default = flipY;
//# sourceMappingURL=flipY.js.map