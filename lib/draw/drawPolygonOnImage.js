"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawPolygonOnImage = void 0;
const robust_point_in_polygon_1 = __importDefault(require("robust-point-in-polygon"));
const arrayPointsToObjects_1 = require("../utils/arrayPointsToObjects");
const checkProcessable_1 = __importDefault(require("../utils/checkProcessable"));
const getOutputImage_1 = require("../utils/getOutputImage");
const deleteDuplicates_1 = require("./utils/deleteDuplicates");
/**
 * Draw a polygon defined by an array of points onto an image.
 *
 * @param image - Image to process.
 * @param points - Polygon vertices.
 * @param options - Draw Line options.
 * @returns The image with the polygon drawing.
 */
function drawPolygonOnImage(image, points, options = {}) {
    const { fillColor, origin = { column: 0, row: 0 }, ...otherOptions } = options;
    (0, checkProcessable_1.default)(image, 'drawPolygon', {
        bitDepth: [8, 16],
    });
    let newImage = (0, getOutputImage_1.getOutputImage)(image, options, { clone: true });
    if (fillColor === undefined) {
        return newImage.drawPolyline([...points, points[0]], {
            origin,
            ...otherOptions,
        });
    }
    else {
        if (fillColor.length !== image.channels) {
            throw new Error('drawPolygon: fill color is not compatible with image.');
        }
        const filteredPoints = (0, deleteDuplicates_1.deleteDuplicates)(points);
        const arrayPoints = (0, arrayPointsToObjects_1.arrayPointsToObjects)(filteredPoints);
        for (let row = 0; row < newImage.height; row++) {
            for (let column = 0; column < newImage.width; column++) {
                if ((0, robust_point_in_polygon_1.default)(arrayPoints, [column, row]) === -1) {
                    newImage.setPixel(origin.column + column, origin.row + row, fillColor);
                }
            }
        }
    }
    return newImage.drawPolyline([...points, points[0]], {
        origin,
        ...otherOptions,
    });
}
exports.drawPolygonOnImage = drawPolygonOnImage;
//# sourceMappingURL=drawPolygonOnImage.js.map