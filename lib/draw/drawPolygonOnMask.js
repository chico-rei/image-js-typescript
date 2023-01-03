"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawPolygonOnMask = void 0;
const robust_point_in_polygon_1 = __importDefault(require("robust-point-in-polygon"));
const arrayPointsToObjects_1 = require("../utils/arrayPointsToObjects");
const getOutputImage_1 = require("../utils/getOutputImage");
const deleteDuplicates_1 = require("./utils/deleteDuplicates");
/**
 * Draw a polygon defined by an array of points on a mask.
 *
 * @param mask - Mask to process.
 * @param points - Polygon vertices.
 * @param options - Draw Line options.
 * @returns The mask with the polygon drawing.
 */
function drawPolygonOnMask(mask, points, options = {}) {
    const { filled = false, origin = { column: 0, row: 0 }, ...otherOptions } = options;
    let newMask = (0, getOutputImage_1.maskToOutputMask)(mask, options, { clone: true });
    if (!filled) {
        return newMask.drawPolyline([...points, points[0]], {
            origin,
            ...otherOptions,
        });
    }
    const filteredPoints = (0, deleteDuplicates_1.deleteDuplicates)(points);
    const arrayPoints = (0, arrayPointsToObjects_1.arrayPointsToObjects)(filteredPoints);
    for (let row = 0; row < newMask.height; row++) {
        for (let column = 0; column < newMask.width; column++) {
            if ((0, robust_point_in_polygon_1.default)(arrayPoints, [column, row]) === -1) {
                newMask.setBit(origin.column + column, origin.row + row, 1);
            }
        }
    }
    return newMask.drawPolyline([...points, points[0]], {
        origin,
        ...otherOptions,
    });
}
exports.drawPolygonOnMask = drawPolygonOnMask;
//# sourceMappingURL=drawPolygonOnMask.js.map