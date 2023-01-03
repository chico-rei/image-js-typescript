import { Image } from '../Image';
import checkProcessable from '../utils/checkProcessable';
import { getDefaultColor } from '../utils/getDefaultColor';
import { getOutputImage, maskToOutputMask } from '../utils/getOutputImage';
/**
 * Draw a rectangle defined by position of the top-left corner, width and height.
 *
 * @param image - Image to process.
 * @param options - Draw rectangle options.
 * @returns The image with the rectangle drawing.
 */
export function drawRectangle(image, options = {}) {
    const { origin = { column: 0, row: 0 }, width = image.width, height = image.height, strokeColor: color = getDefaultColor(image), fillColor: fill, } = options;
    const { column, row } = origin;
    let newImage;
    if (image instanceof Image) {
        checkProcessable(image, 'drawRectangle', {
            bitDepth: [8, 16],
        });
        newImage = getOutputImage(image, options, { clone: true });
    }
    else {
        newImage = maskToOutputMask(image, options, { clone: true });
    }
    if (color !== 'none') {
        for (let currentColumn = column; currentColumn < column + width; currentColumn++) {
            newImage.setVisiblePixel(currentColumn, row, color);
            newImage.setVisiblePixel(currentColumn, row + height - 1, color);
        }
        for (let currentRow = row + 1; currentRow < row + height - 1; currentRow++) {
            newImage.setVisiblePixel(column, currentRow, color);
            newImage.setVisiblePixel(column + width - 1, currentRow, color);
            if (fill) {
                for (let col = column + 1; col < column + width - 1; col++) {
                    newImage.setVisiblePixel(col, currentRow, fill);
                    newImage.setVisiblePixel(col, currentRow, fill);
                }
            }
        }
    }
    // color is none but fill is defined
    else if (fill) {
        for (let currentRow = row + 1; currentRow < row + height - 1; currentRow++) {
            for (let currentColumn = column + 1; currentColumn < column + width - 1; currentColumn++) {
                newImage.setVisiblePixel(currentColumn, currentRow, fill);
                newImage.setVisiblePixel(currentColumn, currentRow, fill);
            }
        }
    }
    return newImage;
}
//# sourceMappingURL=drawRectangle.js.map