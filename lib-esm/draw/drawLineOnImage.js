import { line } from 'bresenham-zingl';
import checkProcessable from '../utils/checkProcessable';
import { getDefaultColor } from '../utils/getDefaultColor';
import { getOutputImage } from '../utils/getOutputImage';
/**
 * Draw a line defined by two points onto an image.
 *
 * @param image - Image to process.
 * @param from - Line starting point.
 * @param to - Line ending point.
 * @param options - Draw Line options.
 * @returns The mask with the line drawing.
 */
export function drawLineOnImage(image, from, to, options = {}) {
    const newImage = getOutputImage(image, options, { clone: true });
    const { strokeColor: color = getDefaultColor(newImage), origin = { column: 0, row: 0 }, } = options;
    checkProcessable(newImage, 'drawLine', {
        bitDepth: [8, 16],
    });
    line(Math.round(origin.column + from.column), Math.round(origin.row + from.row), Math.round(origin.column + to.column), Math.round(origin.row + to.row), (column, row) => {
        newImage.setVisiblePixel(column, row, color);
    });
    return newImage;
}
//# sourceMappingURL=drawLineOnImage.js.map