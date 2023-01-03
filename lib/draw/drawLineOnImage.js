"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawLineOnImage = void 0;
const bresenham_zingl_1 = require("bresenham-zingl");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const getDefaultColor_1 = require("../utils/getDefaultColor");
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Draw a line defined by two points onto an image.
 *
 * @param image - Image to process.
 * @param from - Line starting point.
 * @param to - Line ending point.
 * @param options - Draw Line options.
 * @returns The mask with the line drawing.
 */
function drawLineOnImage(image, from, to, options = {}) {
    const newImage = (0, getOutputImage_1.getOutputImage)(image, options, { clone: true });
    const { strokeColor: color = (0, getDefaultColor_1.getDefaultColor)(newImage), origin = { column: 0, row: 0 }, } = options;
    (0, checkProcessable_1.default)(newImage, 'drawLine', {
        bitDepth: [8, 16],
    });
    (0, bresenham_zingl_1.line)(Math.round(origin.column + from.column), Math.round(origin.row + from.row), Math.round(origin.column + to.column), Math.round(origin.row + to.row), (column, row) => {
        newImage.setVisiblePixel(column, row, color);
    });
    return newImage;
}
exports.drawLineOnImage = drawLineOnImage;
//# sourceMappingURL=drawLineOnImage.js.map