import { line } from 'bresenham-zingl';
import { maskToOutputMask } from '../utils/getOutputImage';
/**
 * Draw a line defined by two points onto a mask.
 *
 * @param mask - Mask to process.
 * @param from - Line starting point.
 * @param to - Line ending point.
 * @param options - Draw Line options.
 * @returns The mask with the line drawing.
 */
export function drawLineOnMask(mask, from, to, options = {}) {
    const { origin = { column: 0, row: 0 } } = options;
    const newMask = maskToOutputMask(mask, options, { clone: true });
    line(Math.round(origin.column + from.column), Math.round(origin.row + from.row), Math.round(origin.column + to.column), Math.round(origin.row + to.row), (column, row) => {
        newMask.setVisiblePixel(column, row, [1]);
    });
    return newMask;
}
//# sourceMappingURL=drawLineOnMask.js.map