/**
 * Convert object points into array points.
 *
 * @param points - Array of points as objects.
 * @returns Array of points as arrays
 */
export function arrayPointsToObjects(points) {
    let result = [];
    for (let point of points) {
        result.push([point.column, point.row]);
    }
    return result;
}
//# sourceMappingURL=arrayPointsToObjects.js.map