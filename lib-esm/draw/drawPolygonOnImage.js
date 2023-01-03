import robustPointInPolygon from 'robust-point-in-polygon';
import { arrayPointsToObjects } from '../utils/arrayPointsToObjects';
import checkProcessable from '../utils/checkProcessable';
import { getOutputImage } from '../utils/getOutputImage';
import { deleteDuplicates } from './utils/deleteDuplicates';
/**
 * Draw a polygon defined by an array of points onto an image.
 *
 * @param image - Image to process.
 * @param points - Polygon vertices.
 * @param options - Draw Line options.
 * @returns The image with the polygon drawing.
 */
export function drawPolygonOnImage(image, points, options = {}) {
    const { fillColor, origin = { column: 0, row: 0 }, ...otherOptions } = options;
    checkProcessable(image, 'drawPolygon', {
        bitDepth: [8, 16],
    });
    let newImage = getOutputImage(image, options, { clone: true });
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
        const filteredPoints = deleteDuplicates(points);
        const arrayPoints = arrayPointsToObjects(filteredPoints);
        for (let row = 0; row < newImage.height; row++) {
            for (let column = 0; column < newImage.width; column++) {
                if (robustPointInPolygon(arrayPoints, [column, row]) === -1) {
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
//# sourceMappingURL=drawPolygonOnImage.js.map