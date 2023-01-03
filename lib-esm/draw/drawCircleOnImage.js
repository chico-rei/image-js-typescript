import { circle } from 'bresenham-zingl';
import checkProcessable from '../utils/checkProcessable';
import { getDefaultColor } from '../utils/getDefaultColor';
import { getOutputImage } from '../utils/getOutputImage';
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
export function drawCircleOnImage(image, center, radius, options = {}) {
    const newImage = getOutputImage(image, options, { clone: true });
    const { color = getDefaultColor(newImage), fill } = options;
    checkProcessable(newImage, 'paintPoints', {
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
        circle(center.column, center.row, radius, (column, row) => {
            newImage.setVisiblePixel(column, row, color);
        });
    }
    else {
        if (radius === 1) {
            newImage.setVisiblePixel(center.column, center.row, fill);
        }
        circle(center.column, center.row, radius, (column, row) => {
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
//# sourceMappingURL=drawCircleOnImage.js.map