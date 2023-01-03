"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawPoints = void 0;
const Image_1 = require("../Image");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const getDefaultColor_1 = require("../utils/getDefaultColor");
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Draw a set of points on an image or a mask.
 *
 * @param image - The image on which to draw the points.
 * @param points - Array of points.
 * @param options - Draw points on Image options.
 * @returns New mask.
 */
function drawPoints(image, points, options = {}) {
    let newImage;
    if (image instanceof Image_1.Image) {
        newImage = (0, getOutputImage_1.getOutputImage)(image, options, { clone: true });
    }
    else {
        newImage = (0, getOutputImage_1.maskToOutputMask)(image, options, { clone: true });
    }
    const { color = (0, getDefaultColor_1.getDefaultColor)(newImage), origin = { row: 0, column: 0 } } = options;
    (0, checkProcessable_1.default)(newImage, 'drawPoints', {
        bitDepth: [1, 8, 16],
    });
    for (const point of points) {
        newImage.setVisiblePixel(origin.column + point.column, origin.row + point.row, color);
    }
    return newImage;
}
exports.drawPoints = drawPoints;
//# sourceMappingURL=drawPoints.js.map