"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.drawLineOnMask = void 0;
const bresenham_zingl_1 = require("bresenham-zingl");
const getOutputImage_1 = require("../utils/getOutputImage");
/**
 * Draw a line defined by two points onto a mask.
 *
 * @param mask - Mask to process.
 * @param from - Line starting point.
 * @param to - Line ending point.
 * @param options - Draw Line options.
 * @returns The mask with the line drawing.
 */
function drawLineOnMask(mask, from, to, options = {}) {
    const { origin = { column: 0, row: 0 } } = options;
    const newMask = (0, getOutputImage_1.maskToOutputMask)(mask, options, { clone: true });
    (0, bresenham_zingl_1.line)(Math.round(origin.column + from.column), Math.round(origin.row + from.row), Math.round(origin.column + to.column), Math.round(origin.row + to.row), (column, row) => {
        newMask.setVisiblePixel(column, row, [1]);
    });
    return newMask;
}
exports.drawLineOnMask = drawLineOnMask;
//# sourceMappingURL=drawLineOnMask.js.map