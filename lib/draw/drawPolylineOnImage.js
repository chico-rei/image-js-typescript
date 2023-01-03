"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawPolylineOnImage = void 0;
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const getDefaultColor_1 = require("../utils/getDefaultColor");
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Draw a polyline defined by an array of points on an image.
 *
 * @param image - Image to process.
 * @param points - Polyline array of points.
 * @param options - Draw polyline options.
 * @returns The image with the polyline drawing.
 */
function drawPolylineOnImage(image, points, options = {}) {
    const { strokeColor: color = (0, getDefaultColor_1.getDefaultColor)(image), origin = { column: 0, row: 0 }, } = options;
    (0, checkProcessable_1.default)(image, 'drawPolyline', {
        bitDepth: [8, 16],
    });
    let newImage = (0, getOutputImage_1.getOutputImage)(image, options, { clone: true });
    for (let i = 0; i < points.length - 1; i++) {
        const from = points[i];
        const to = points[i + 1];
        newImage.drawLine(from, to, { out: newImage, strokeColor: color, origin });
    }
    return newImage;
}
exports.drawPolylineOnImage = drawPolylineOnImage;
//# sourceMappingURL=drawPolylineOnImage.js.map