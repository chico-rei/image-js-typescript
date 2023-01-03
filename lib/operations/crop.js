"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crop = void 0;
const Image_1 = require("../Image");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
/**
 * Crop the input image to a desired size.
 *
 * @param image - Image to crop
 * @param [options] - Crop options.
 * @returns The new cropped image
 * @example
 * var cropped = image.crop({
 *   row:20,
 *   column:100
 * });
 */
function crop(image, options = {}) {
    const { origin = { row: 0, column: 0 }, width = image.width - origin.column, height = image.height - origin.row, } = options;
    const { column, row } = origin;
    (0, checkProcessable_1.default)(image, 'crop', {
        bitDepth: [8, 16],
    });
    if (row > image.height - 1 || column > image.width - 1) {
        throw new Error(`crop: origin (row:${row}, column:${column}) out of range (${image.width - 1}; ${image.height - 1})`);
    }
    if (width <= 0 || height <= 0) {
        throw new Error(`crop: width and height (width:${width}; height:${height}) must be positive numbers`);
    }
    if (row < 0 || column < 0) {
        throw new Error(`crop: row and column (row:${row}, column:${column}) must be positive numbers`);
    }
    if (width > image.width - column || height > image.height - row) {
        throw new Error(`crop: (row:${row}, column: ${column}, width:${width}, height:${height}) size is out of range`);
    }
    const newImage = Image_1.Image.createFrom(image, {
        width,
        height,
    });
    for (let currentRow = 0; currentRow < height; currentRow++) {
        for (let currentColumn = 0; currentColumn < width; currentColumn++) {
            newImage.setPixel(currentColumn, currentRow, image.getPixel(column + currentColumn, row + currentRow));
        }
    }
    return newImage;
}
exports.crop = crop;
//# sourceMappingURL=crop.js.map