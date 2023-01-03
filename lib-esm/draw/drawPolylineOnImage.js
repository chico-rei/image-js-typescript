import checkProcessable from '../utils/checkProcessable';
import { getDefaultColor } from '../utils/getDefaultColor';
import { getOutputImage } from '../utils/getOutputImage';
/**
 * Draw a polyline defined by an array of points on an image.
 *
 * @param image - Image to process.
 * @param points - Polyline array of points.
 * @param options - Draw polyline options.
 * @returns The image with the polyline drawing.
 */
export function drawPolylineOnImage(image, points, options = {}) {
    const { strokeColor: color = getDefaultColor(image), origin = { column: 0, row: 0 }, } = options;
    checkProcessable(image, 'drawPolyline', {
        bitDepth: [8, 16],
    });
    let newImage = getOutputImage(image, options, { clone: true });
    for (let i = 0; i < points.length - 1; i++) {
        const from = points[i];
        const to = points[i + 1];
        newImage.drawLine(from, to, { out: newImage, strokeColor: color, origin });
    }
    return newImage;
}
//# sourceMappingURL=drawPolylineOnImage.js.map