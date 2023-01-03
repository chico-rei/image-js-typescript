"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawCircleOnImage = void 0;
const bresenham_zingl_1 = require("bresenham-zingl");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const getDefaultColor_1 = require("../utils/getDefaultColor");
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 *
 * Draw a circle defined by center and radius.
 *
 * @param image - Image to process.
 * @param center - Circle center point.
 * @param radius - Circle radius.
 * @param options - Draw circle options.
 * @returns The original drawn image
 */
function drawCircleOnImage(image, center, radius, options = {}) {
    const newImage = (0, getOutputImage_1.getOutputImage)(image, options, { clone: true });
    const { color = (0, getDefaultColor_1.getDefaultColor)(newImage), fill } = options;
    (0, checkProcessable_1.default)(newImage, 'paintPoints', {
        bitDepth: [8, 16],
    });
    if (radius < 0) {
        throw new Error('Circle radius must be positive');
    }
    if (radius === 0) {
        newImage.setVisiblePixel(center.column, center.row, color);
        return newImage;
    }
    if (!fill) {
        (0, bresenham_zingl_1.circle)(center.column, center.row, radius, (column, row) => {
            newImage.setVisiblePixel(column, row, color);
        });
    }
    else {
        if (radius === 1) {
            newImage.setVisiblePixel(center.column, center.row, fill);
        }
        (0, bresenham_zingl_1.circle)(center.column, center.row, radius, (column, row) => {
            newImage.setVisiblePixel(column, row, color);
            //todo: fill is not optimal we can fill symmetrically
            if (column - 1 > center.column) {
                newImage.drawLine({ row, column: column - 1 }, { row, column: center.column }, { strokeColor: fill, out: newImage });
            }
            else if (column + 1 < center.column) {
                newImage.drawLine({ row, column: column + 1 }, { row, column: center.column }, { strokeColor: fill, out: newImage });
            }
        });
    }
    return newImage;
}
exports.drawCircleOnImage = drawCircleOnImage;
//# sourceMappingURL=drawCircleOnImage.js.map