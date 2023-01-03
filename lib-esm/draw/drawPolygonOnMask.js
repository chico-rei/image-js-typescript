import robustPointInPolygon from 'robust-point-in-polygon';
import { arrayPointsToObjects } from '../utils/arrayPointsToObjects';
import { maskToOutputMask } from '../utils/getOutputImage';
import { deleteDuplicates } from './utils/deleteDuplicates';
/**
 * Draw a polygon defined by an array of points on a mask.
 *
 * @param mask - Mask to process.
 * @param points - Polygon vertices.
 * @param options - Draw Line options.
 * @returns The mask with the polygon drawing.
 */
export function drawPolygonOnMask(mask, points, options = {}) {
    const { filled = false, origin = { column: 0, row: 0 }, ...otherOptions } = options;
    let newMask = maskToOutputMask(mask, options, { clone: true });
    if (!filled) {
        return newMask.drawPolyline([...points, points[0]], {
            origin,
            ...otherOptions,
        });
    }
    const filteredPoints = deleteDuplicates(points);
    const arrayPoints = arrayPointsToObjects(filteredPoints);
    for (let row = 0; row < newMask.height; row++) {
        for (let column = 0; column < newMask.width; column++) {
            if (robustPointInPolygon(arrayPoints, [column, row]) === -1) {
                newMask.setBit(origin.column + column, origin.row + row, 1);
            }
        }
    }
    return newMask.drawPolyline([...points, points[0]], {
        origin,
        ...otherOptions,
    });
}
//# sourceMappingURL=drawPolygonOnMask.js.map