import { Image } from '../Image';
import checkProcessable from '../utils/checkProcessable';
import { getDefaultColor } from '../utils/getDefaultColor';
import { getOutputImage, maskToOutputMask } from '../utils/getOutputImage';
/**
 * Draw a set of points on an image or a mask.
 *
 * @param image - The image on which to draw the points.
 * @param points - Array of points.
 * @param options - Draw points on Image options.
 * @returns New mask.
 */
export function drawPoints(image, points, options = {}) {
    let newImage;
    if (image instanceof Image) {
        newImage = getOutputImage(image, options, { clone: true });
    }
    else {
        newImage = maskToOutputMask(image, options, { clone: true });
    }
    const { color = getDefaultColor(newImage), origin = { row: 0, column: 0 } } = options;
    checkProcessable(newImage, 'drawPoints', {
        bitDepth: [1, 8, 16],
    });
    for (const point of points) {
        newImage.setVisiblePixel(origin.column + point.column, origin.row + point.row, color);
    }
    return newImage;
}
//# sourceMappingURL=drawPoints.js.map